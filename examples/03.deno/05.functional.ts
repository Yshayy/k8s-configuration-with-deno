import { createMicroservice } from "https://deno.land/x/deploykit@0.0.20/blueprint/k8s/app.ts";
import {
  addDeployment,
  addService,
  expose,
} from "https://deno.land/x/deploykit@0.0.20/blueprint/k8s/operators/all.ts";

createMicroservice().with(
  addDeployment({ image: "bsord/tetris" }),
  addService({ port: 80 }),
  expose({ domain: "tetris.localtest.met" }),
).dump(
  { name: "tetris", namespace: "default", labels: { app: "tetris" } },
);
