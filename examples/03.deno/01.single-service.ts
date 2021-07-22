import * as k8s from "https://deno.land/x/deploykit@0.0.20/generated/k8s/v1.18.3/mod.ts";
import { stringify } from "https://deno.land/std@0.102.0/encoding/yaml.ts";
const appName = "tetris";
const image = "bsord/tetris";
const labels = {
  app: "tetris",
};
const metadata = {
  name: "tetris",
  labels,
};

const deployment = k8s.api.apps.v1.createDeployment({
  metadata,
  spec: {
    selector: {
      matchLabels: labels,
    },
    template: {
      metadata: {
        labels: labels,
      },
      spec: {
        containers: [{
          name: appName,
          image: image,
        }],
      },
    },
  },
});

const service = k8s.api.core.v1.createService({
  metadata,
  spec: {
    selector: labels,
    ports: [{
      port: 80,
      targetPort: 8080,
    }],
  },
});

const ingress = k8s.api.networking.v1beta1.createIngress({
  metadata,
  spec: {
    rules: [{
      host: "tetris.localtest.me",
      http: {
        paths: [
          {
            pathType: "prefix",
            path: "/",
            backend: {
              serviceName: "tetris",
            },
          },
        ],
      },
    }],
  },
});

console.log(
  [
    stringify(deployment, { noRefs: true }),
    stringify(ingress, { noRefs: true }),
    stringify(service, { noRefs: true }),
  ]
    .join("\n---\n"),
);
