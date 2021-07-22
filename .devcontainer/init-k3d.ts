#!/usr/bin/env -S deno run --unstable --allow-run --allow-read --allow-net --allow-env https://deno.land/x/dzx@0.2.3/dzx.ts
/// <reference path="https://deno.land/x/dzx@0.2.3/types.d.ts" />

$.verbose = true;
$.shell = "/usr/bin/zsh";

try {
    $.stdout = "inherit";
    await $`k3d cluster create deno-k8s`;
} catch (ex: any){
    if (ex instanceof Error){
        if (!ex.message.includes("name already exists") ){
            throw ex
        }
    }
}
