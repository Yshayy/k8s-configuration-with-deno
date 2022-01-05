import { Application } from "./utils/application.ts";

export const service = new Application({
  name: "tetris",
  image: "bsord/tetris",
  service: {
    port: 8080,
    expose: {
      hostname: "tetris.localtest.me",
    },
  },
});

// We can still use overlaying!
/*
service.deployment.spec.replicas = 3;
service.ingress!.spec!.tls = [{
  secretName: "some secret"
}]
service.ingress!.spec!.rules![0].host = "tetris2.localtest.me"
service.deployment.metadata.labels["some-label"] = "wwww"
*/

console.log(service.yaml());
