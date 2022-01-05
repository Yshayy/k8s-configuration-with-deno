import { importResources, resourceOfType } from "./interop/utils.ts";
import {readAll} from 'https://deno.land/std@0.119.0/streams/conversion.ts'
const stdin = new TextDecoder().decode(await readAll(Deno.stdin));

const imported = importResources(stdin)

const result = imported.traverse(
    resourceOfType("apps/v1", "Deployment"), (deployment)=> {
    deployment.spec!.replicas = 5
}).traverse(resourceOfType("networking.k8s.io/v1", "Ingress"), (ingress)=> {
    if (!ingress.spec?.tls){
        throw "Ingress must have tls defintion"
    }
})

console.log(result.yaml)