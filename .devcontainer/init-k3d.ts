#!/usr/bin/env -S deno run --unstable --allow-run --allow-read --allow-net --allow-env https://deno.land/x/dzx@0.3.0/dzx.ts
/// <reference path="https://deno.land/x/dzx@0.3.0/types.d.ts" />

$.verbose = true;
$.shell = "/usr/bin/zsh";

try {
    $.stdout = "inherit";
    await $`k3d cluster create -p 8081:80@loadbalancer deno-k8s`;
} catch (ex: any){
    if (ex instanceof Error){
        if (!ex.message.includes("name already exists") ){
            throw ex
        }
    }
}
