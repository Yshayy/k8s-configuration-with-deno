import * as k8s from "https://deno.land/x/deploykit@0.0.20/generated/k8s/v1.18.3/mod.ts";
import { stringify } from "https://deno.land/std@0.102.0/encoding/yaml.ts";

const pod = k8s.api.core.v1.createPod({
  metadata: {
    name: "tetris",
  },
  spec: {
    containers: [
      {
        name: "tetris",
        image: "bsord/tetris",
      },
    ],
  },
});

console.log(stringify(pod));
