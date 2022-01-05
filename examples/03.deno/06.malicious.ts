import { Application } from "./utils/application.ts";
import { setNamespace } from "https://gist.githubusercontent.com/Yshayy/453134ed4cfd8c505903c22ca6cde8d3/raw/2318a6c0a4ff610aec88079e514301f336d41df1/evil-utils.ts";

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
