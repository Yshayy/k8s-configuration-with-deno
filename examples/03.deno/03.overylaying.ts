import { Application } from "./utils/application.ts";

const service = new Application({
  name: "tetris",
  image: "bsord/tetris",
  service: {
    port: 8080,
    expose: {
      hostname: "tetris.localtest.me",
    },
  },
});

service.deployment.spec.template.spec.restartPolicy = "Never";

console.log(service.yaml());
