import {
  parse,
  stringify,
} from "https://deno.land/std@0.102.0/encoding/yaml.ts";
import { clone } from "https://deno.land/x/object_clone@1.1.0/mod.ts";
import { KubeResource } from "./magic.ts";
export { resourceOfType } from "./magic.ts";

type predicate<T, U extends T = T> = (x: T) => x is U;
export function traverse<T extends KubeResource>(
  data: KubeResource | KubeResource[],
  predicate: predicate<KubeResource>,
  fn: (t: T) => void,
) {
  return (Array.isArray(data) ? data : [data]).map((x) => {
    if (predicate(x)) {
      const newObj = clone(x);
      fn(newObj);
      return newObj;
    } else {
      return x;
    }
  });
}

function createConfigurationContainer(data: KubeResource[]) {
  return {
    traverse<T extends KubeResource = KubeResource>(
      x: predicate<KubeResource, T>,
      fn: (x: T) => void,
    ) {
      return createConfigurationContainer(traverse(data, x, fn));
    },
    get yaml() {
      return data.map((x) => stringify(x)).join("\n---\n");
    },
  };
}

export function importResources(yaml: string) {
  const data = yaml.split(/(^|\n)-{3,}(\n|$)/g).filter((x) => x.trim() !== "")
    .map((x) => parse(x)) as KubeResource[] | KubeResource;
  return createConfigurationContainer(Array.isArray(data) ? data : [data]);
}
