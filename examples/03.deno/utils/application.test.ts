import {
  assertEquals,
  assertExists,
} from "https://deno.land/std@0.103.0/testing/asserts.ts";
import { Application } from "./application.ts";

Deno.test("Microservice Service should connect containerPort->service->ingress", () => {
  const port = 80;
  const hostname = "some-host";
  const { ingress, service, deployment } = new Application({
    name: "tetris",
    image: "bsord/tetris",
    service: {
      port,
      expose: {
        hostname,
      },
    },
  });
  assertExists(ingress);
  assertExists(service);
  assertExists(deployment);

  const rule = ingress.spec!.rules!.find((x) => x.host === hostname);
  assertExists(rule);
  const rootPath = rule.http?.paths.find((x) =>
    x.path === "/" && x.pathType === "Prefix"
  );
  assertExists(rootPath);
  assertEquals(rootPath.backend.service?.name, service.metadata!.name);
  const servicePort = service.spec!.ports!.find((x) =>
    x.port === rootPath.backend.service?.port?.number
  );
  assertExists(servicePort, "missing service port");
  assertEquals(servicePort.targetPort, port);
});
