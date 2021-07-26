import * as k8s from "https://deno.land/x/deploykit@0.0.20/generated/k8s/v1.18.3/mod.ts";
import { stringify } from "https://deno.land/std@0.102.0/encoding/yaml.ts";
const appName = "tetris";
const image = "ociotec/tetris";
const labels = {
  app: "tetris",
};
const metadata = {
  name: "tetris",
  labels,
};

export const tetris = {
  deployment: k8s.api.apps.v1.createDeployment({
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
  }),
  service:k8s.api.core.v1.createService({
    metadata,
    spec: {
      selector: labels,
      ports: [{
        port: 80,
        targetPort: 80,
      }],
    },
  }),
  ingress: k8s.api.networking.v1beta1.createIngress({
    metadata,
    spec: {
      rules: [{
        host: "tetris.localtest.me",
        http: {
          paths: [
            {
              pathType: "Prefix",
              path: "/",
              backend: {
                serviceName: appName,
                servicePort: 80
              },
            },
          ],
        },
      }],
    },
  })
}

console.log(
  [
    stringify(tetris.deployment, { noRefs: true }),
    stringify(tetris.ingress, { noRefs: true }),
    stringify(tetris.service, { noRefs: true }),
  ]
    .join("\n---\n"),
);
