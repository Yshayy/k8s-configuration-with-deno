import { stringify } from "https://deno.land/std@0.102.0/encoding/yaml.ts";
import { Deployment } from "https://deno.land/x/deploykit@0.0.20/generated/k8s/v1.18.3/api/apps/v1/mod.ts";
import * as k8s from "https://deno.land/x/deploykit@0.0.20/generated/k8s/v1.18.3/api/mod.ts";

type MicroserviceOptions = {
    name: string,
    image: string,
    env?: {
        [name:string]: string
    }
    service?: {
        port: number
        expose?: {
            hostname: string | undefined
        }
    }
}

export class Microservice{
    #options:MicroserviceOptions
    ingress?: k8s.networking.v1beta1.Ingress
    service?: k8s.core.v1.Service
    deployment: Deployment&{ metadata: { name: string; labels: { app: string; }; }; spec: { selector: { matchLabels: { app: string; }; }; template: { metadata: { labels: { app: string; }; }; spec: { containers: { name: string; image: string; }[]; }; }; }; }&Pick<Deployment,"apiVersion"|"kind">;
    
    yaml(){
        return [this.deployment,this.service, this.ingress].filter(x=>!!x)
            .map((x)=>stringify(x!, { noRefs: true })).join("\n---\n")
    }

    #getMetaData(){
        return {
            name: this.#options.name,
            labels: this.#getLabels()
        }
    }

    #getLabels(){
        return {
            app: this.#options.name
        }
    }

    constructor(options: MicroserviceOptions){
        this.#options = options
        this.deployment = k8s.apps.v1.createDeployment({
            metadata: this.#getMetaData(),
            spec: {
                selector: {
                    matchLabels: {
                        app: options.name,
                    }
                },
                template: {
                    metadata: {
                        labels: this.#getLabels(),
                    },
                    spec: {
                        containers: [{
                            name: options.name,
                            image: options.image,
                        }]
                    }
                }
            }
        })
        if (options.env){
            this.deployment.spec.template.spec.containers[0].env = Object.entries(options.env).map(([name, value])=> ({
                name,
                value
            }))
        }
        if (options.service){
            this.deployment.spec.template.spec.containers[0].ports = [{containerPort: options.service.port }]
            this.service = k8s.core.v1.createService({
                metadata: this.#getMetaData(),
                spec: {
                    type: "ClusterIP",
                    selector:this.#getLabels(),
                    ports:[{
                        port: options.service.port,
                        targetPort: options.service.port
                    }]
                }
            })
            if (options.service.expose){
                this.ingress = k8s.networking.v1beta1.createIngress({
                    metadata: this.#getMetaData(),
                    spec: {
                        rules: [{                        
                            host: options.service.expose.hostname,
                            http: {
                                paths: [{
                                    pathType: "Prefix",
                                    path: "/",
                                    backend: {
                                        serviceName: this.service.metadata!.name,
                                        servicePort: this.service.spec!.ports![0].port,
                                    }
                                }]
                            }
                        }]
                    }
                })
            }
        }
    }
}