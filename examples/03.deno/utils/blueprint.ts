import { createKubeBlueprint } from "https://deno.land/x/deploykit@0.0.24/blueprint/k8s/mod.ts";
import {
  addDeployment,
  addResource,
  addService,
  expose,
} from "https://deno.land/x/deploykit@0.0.24/blueprint/k8s/operators/all.ts";
import * as crds from "https://deno.land/x/deploykit@0.0.24/generated/k8s/crds/mod.ts";
import { KubeMetaContext } from "https://deno.land/x/deploykit@0.0.24/blueprint/k8s/types.ts";

interface MyServiceParams extends KubeMetaContext {
  image: {
    registry: string;
    name: string;
    version: string;
  };
  domain: string;
}

export const serviceBluePrint = createKubeBlueprint((b, { image, domain }: MyServiceParams) =>
  b.with(
    addDeployment({
      image: `${image.registry}/${image.name}:${image.version}`,
    }),
    addService({ port: 80 }),
    addResource(
      "monitor",
      ({ labels }) =>
        crds.monitoring.coreos.com.v1.createServiceMonitor({
          spec: {
            endpoints: [
              {
                path: "/metrics",
              },
            ],
            selector: {
              matchLabels: labels,
            },
          },
        }),
    ),
    expose({ domain }),
  )
);