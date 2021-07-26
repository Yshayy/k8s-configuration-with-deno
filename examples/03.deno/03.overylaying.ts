import { Microservice } from "./utils/microservice.ts";


const service = new Microservice({
  name: "tetris",
  image: "bsord/tetris",
  service: {
    port: 8080,
    expose: {
      hostname: "tetris.localtest.me"
    }
  }
})

service.deployment.spec.template.spec.restartPolicy = "Never"

console.log(service.yaml())