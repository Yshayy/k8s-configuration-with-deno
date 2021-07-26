import {
  assertEquals,
  assertExists,
} from "https://deno.land/std@0.103.0/testing/asserts.ts";
import { tetris } from "./01.single-service.ts";

Deno.test("Tetris Service should expose container port 80 on hostname tetris.localtest.me", () => {
  const rule = tetris.ingress.spec.rules.find((x) =>
    x.host === "tetris.localtest.me"
  );
  assertExists(rule);
  const rootPath = rule.http?.paths.find((x) =>
    x.path === "/" && x.pathType === "Prefix"
  );
  assertExists(rootPath);
  assertEquals(rootPath.backend.serviceName, tetris.service.metadata.name);
  const servicePort = tetris.service.spec.ports.find((x) =>
    x.port === rootPath.backend.servicePort
  );
  assertExists(servicePort, "missing service port");
  assertEquals(servicePort.targetPort, 80 )
});