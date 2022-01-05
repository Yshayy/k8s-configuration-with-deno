import { formatYaml } from "https://deno.land/x/deploykit@0.0.24/utils/format.ts";
import {serviceBluePrint} from "./utils/blueprint.ts"

const service = serviceBluePrint.build({
    name: "my-app",
    namespace: "my-namespace",
    labels: { app: "my-app" },
    image: { name: "abc", registry: "docker.io", version: "latest" },
    domain: "my-app.com",
  })

service.monitor.spec.endpoints = []

console.log(formatYaml(service))