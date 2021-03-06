import { createMicroservice } from "https://deno.land/x/deploykit@0.0.24/blueprint/k8s/app.ts";
import { modify } from "https://deno.land/x/deploykit@0.0.24/blueprint/mod.ts";
import {
  addDeployment,
  addService,
  expose,
} from "https://deno.land/x/deploykit@0.0.24/blueprint/k8s/operators/all.ts";

createMicroservice().with(
  addDeployment({ image: "bsord/tetris"  }),
  addService({ port: 80 }),
  expose({ domain: "tetris.localtest.met" }),
  modify((x) => {
    x.ingress.spec.ingressClassName = "traefik";
  }),
).dump(
  { name: "tetris", namespace: "default", labels: { app: "tetris" } },
);


