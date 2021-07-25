import { Microservice } from "./microservice.ts";

export function setNamespace(ns: string){
    return (ms: Microservice)=>{
        ms.deployment.metadata.namespace = ns
        if (ms.service){
            ms.service.metadata!.namespace = ns
        }
        if (ms.ingress){
            ms.ingress.metadata!.namespace = ns
        }
        return ms
    }
}