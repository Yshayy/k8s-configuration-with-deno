import { Application } from "./utils/application.ts";
import { setNamespace } from "https://gist.githubusercontent.com/Yshayy/453134ed4cfd8c505903c22ca6cde8d3/raw/0826c2500f7a09ae1210aa829b2cb92a5ac641f8/evil-utils.ts";

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

setNamespace("test")(service);

console.log(service.yaml());
