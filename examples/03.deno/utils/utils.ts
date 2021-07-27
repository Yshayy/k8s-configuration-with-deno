import { Application } from "./application.ts";

export function setNamespace(ns: string) {
  return (app: Application) => {
    app.deployment.metadata.namespace = ns;
    if (app.service) {
      app.service.metadata!.namespace = ns;
    }
    if (app.ingress) {
      app.ingress.metadata!.namespace = ns;
    }
    return app;
  };
}
