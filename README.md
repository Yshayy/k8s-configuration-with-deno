# k8s-configuration-with-deno

To run examples:
- create k8s cluster using `k3d cluster create -p 8081:80@loadbalancer deno-k8s`
- cache all deno deps using `deno cache **/*.ts`