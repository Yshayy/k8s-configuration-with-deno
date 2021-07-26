import { stringify } from "https://deno.land/std@0.102.0/encoding/yaml.ts";
import { createNamespace } from "https://deno.land/x/deploykit@0.0.20/generated/k8s/v1.18.3/api/core/v1/mod.ts";
import { Microservice } from "./utils/microservice.ts";
import { setNamespace } from "./utils/utils.ts";

const ns = createNamespace({
  metadata: {
    name: "vote"
  }
})
const db = new Microservice({
  name: "db",
  image: "postgres:9.4",
  env: {
    POSTGRES_HOST_AUTH_METHOD: "trust",
  },
  service: {
    port: 5432,
  },
});
db.deployment.spec.template.spec.volumes = [{
  emptyDir: {},
  name: "db-data",
}];
db.deployment.spec.template.spec.containers[0].volumeMounts = [{
  mountPath: "/var/lib/postgresql/data",
  name: "db-data",
}];

const redis = new Microservice({
  name: "redis",
  image: "redis:alpine",
  service: {
    port: 6379,
  },
});
redis.deployment.spec.template.spec.volumes = [{
  emptyDir: {},
  name: "redis-data",
}];
redis.deployment.spec.template.spec.containers[0].volumeMounts = [{
  mountPath: "/data",
  name: "redis-data",
}];

const vote = new Microservice({
  name: "vote",
  image: "dockersamples/examplevotingapp_vote:before",
  service: {
    port: 80,
    expose: {
      hostname: "vote.localtest.me",
    },
  },
});

const result = new Microservice({
  name: "result",
  image: "dockersamples/examplevotingapp_result:before",
  service: {
    port: 80,
    expose: {
      hostname: "result.localtest.me",
    },
  },
});

const worker = new Microservice({
  name: "worker",
  image: "dockersamples/examplevotingapp_worker",
});

console.log(
  [stringify(ns), ...([db, redis, vote, result, worker].map(setNamespace("vote")).map((x) => x.yaml()))].join("\n---\n"),
);
