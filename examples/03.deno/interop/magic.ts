import * as k8s from "https://deno.land/x/deploykit@0.0.24/generated/k8s/v1.22.5/mod.ts"
import * as crds from "https://deno.land/x/deploykit@0.0.24/generated/k8s/crds/mod.ts"

export type KubeResource = {
    apiVersion: string,
    kind: string
}
type TypedKubeResourceDefFromFactory<T extends (...args:any[])=> any > = ReturnType<T> extends KubeResource & {apiVersion: infer A, kind: infer K} ? {apiVersion:A, kind: K, type: ReturnType<T>} :never
type CollectGVK<T extends {[key:string]: unknown}> = {
    [K in keyof T]: T[K] extends (...args:any[])=> any ? TypedKubeResourceDefFromFactory<T[K]> :
                    T[K] extends {[key:string]: unknown} ? CollectGVK<T[K]> : never ;
}[keyof T]

type ResourceTypes = CollectGVK<typeof k8s> | CollectGVK<typeof crds>
type Filter<X,Prop extends string,Value> = X extends Record<Prop,Value> ? X : never

export function resourceOfType<TApiVersion extends ResourceTypes["apiVersion"],
              TKind extends Filter<ResourceTypes, "apiVersion", TApiVersion>["kind"],
              TType extends Filter<Filter<ResourceTypes, "apiVersion", TApiVersion>, "kind", TKind>["type"]
              >(apiVersion:TApiVersion, kind:TKind){
                  return (o: KubeResource): o is TType => o.apiVersion === apiVersion && o.kind === kind
}

