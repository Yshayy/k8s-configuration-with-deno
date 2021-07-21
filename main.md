---
theme: simple
---

## Experimenting with Deno  
## for easier k8s deployments


<div style="color:#434343">
<div>Yshay Yaacobi</div>
@yshayy
</div>
<div>https://git.io/fxh57</div>

---

## Kubernetes

> "Open-source container-orchestration system for automating computer application deployment, scaling, and management." {style=text-align:left}


---

<!-- .slide: style="text-align: left;" -->

## Kubernetes

- Most popular way to run container workload and distributed microservices 

---

## Deno

> "Deno is a runtime for JavaScript and TypeScript that is based on the V8 JavaScript engine and the Rust programming language." {style=text-align:left}

---

<!-- .slide: style="text-align: left;" -->

## Deno

- The next evolution of node.js

---

## Experimenting with Deno  
## for easier k8s deployments  (?!)

---

## About me

- CTO of livecycle
- Prinicipal Enginner at Soluto
- Full-Stack developerP
- Heavily used kubernetes in the past  5 years
- OSS Maintainer of Tweek (git.io/tweek)



---

### Agenda?

- Quick recap of kubernetes resource model
- YAMLs, Helm and the mess we're in
- Deno for the resque
- Summary and notes

---

### Kubernetes Resource Model

- Resources + Controllers = Profit

---

### Declarative, awesome

- Everything is a resource
- Every resource described with YAML/JSON
- Extensible
- Support extremely complex workloads

---

### Let's start with running something simple with k8s

- Pod

---

### Now let's add more stuff

- Deployment
- Service
- ConfigMap
- Ingress
- Secrets
- PVCs
- PDBs

---

### And not to mention Custom Resources

- Monitor
- Function
- Snapshot
- Canary
- ...

---

### Can it be more simple and less bloated?

- Well... Yes, Probably
- Many have tried

---

### Many...

Helm, OC new-app, Kompose, Spread, Draft, Ksonnet/Kubecfg, Databricks Jsonnet, Kapitan, Konfd, Templates/Ktmpl, Fabric8 client, Kubegen, kenv, Ansible, Puppet, KPM, Nulecule, Kedge (OpenCompose is deprecated), Chartify, Podex, k8sec, kb80r, k8s-kotlin-dsl, KY, Kploy, Kdeploy, Kubernetes-deploy, Generator-kubegen, K8comp, Kontemplate, Kexpand, Forge, Psykube, Koki, Deploymentizer, generator-kubegen, Broadway, Srvexpand, Rok8s-scripts, ERB-Hiera, k8s-icl, sed, envsubst, Jinja, spiff {style=font-size:20px}

(taken from https://github.com/kubernetes/community/blob/master/contributors/design-proposals/architecture/declarative-application-management.md) {style=font-size:14px}

---

### Quick glance - Helm

- DEMO: Simple chart example
- DEMO: Complex chart example

---

### Helm Pros

- Distributed package registry
- 

---

- Editing is difficult
- Everything is text based
- Difficult to validate
- Lots of duplicate parameterization with k8s
- No idiomatic way to "patch" charts

----

### Quick glance - Kustomize

---

### What's wrong with configuration languages?

---

### What's important?

---

### Composition

---

### Correctness

---

### Code Sharing

---

### Developer friendly

---

### Security

---

<style>
.feature-table, td {
    border: 1px solid black
}

.feature-table {
    border-bottom: 1px solid black
}

.feature-table th {
    font-size: 22px;
    border: 1px solid black;
}

.feature-table td {
    font-size: 16px;   
}

.feature-table td[colspan] {
    background-color:black;
    color: white;
    font-size: 18px;
    font-weight: bold;
}
</style>

|                      	| Helm  	|  Kustomize 	|  
|----------------------	|-------	|-----------	|
| Composition                                     |||   
| Code-Reuse            |   	    |           	|   
| Abstraction           |   	    |           	|   
| Parametrization       |   	    |           	|   
| Overlays              |           |               |
| Correctness                                     |||   
| Type-Safety           |   	    |           	|   
| Testability           |   	    |           	|   
| Code Sharing                                    |||   
| Exteranl imports     	|           |               |   
| Depenencies management|   	    |           	|   
| Developer friendly                              |||   
| Familiar PL        	|   	    |           	|   
| IDE support          	|   	    |           	|   
| No Boilerplate        |   	    |           	|   
| Security                                        |||   
| Runtime              	|   	    |           	|   
| Sandbox              	|   	    |           	|   
{.feature-table}

---

### Let's take a look of Deno

---

### CLI

- DEMO: Exploring Deno cli

---

### Typescript

- Typescript Benefits

---

### Let's create a k8s Objects

- Pod
- Service
- Deployment

---

### Let's create high level abstraction

- Application

---

### Let's create a test

- 

---

### Importing external package

---

### And it secure

- Importing malicious package

### Ingredients

- Type generation
- Code re-use building-blocks
- That's all

---

### Great success


<style>
.feature-table td {
    border: 1px solid black
}

.feature-table td h2 {
    font-size: 18px;
    font-weight: bold;
}

.feature-table td h3 {
    font-size: 14px;
}
</style>

|                      	| Helm  	|  Kustomize 	|  
|----------------------	|-------	|-----------	|
| ## Composition        |   	    |           	|   
| ### Code-Reuse        |   	    |           	|   
| ### Abstraction       |   	    |           	|   
| ### Parametrization   |   	    |           	|   
| ## Correctness        |   	    |           	|   
| ### Type-Safety       |   	    |           	|   
| ### Testability       |   	    |           	|   
| ## Code Sharing       |   	    |           	|   
| Package management   	|   	    |           	|   
| Support iterations   	|   	    |           	|   
| Developer friendly   	|   	    |           	|   
| Programming Language 	|   	    |           	|   
| IDE support          	|   	    |           	|   
| Boilerplate          	|   	    |           	|   
| Ease of use          	|   	    |           	|   
| Security             	|   	    |           	|   
| Runtime              	|   	    |           	|   
| Sandbox              	|   	    |           	|   
{.feature-table}

---

### Closing notes

--- 

### Deno for 

- There are benefits of using a real programming language, for configuration
- Especially 

### It's done before

- Pulumi
- Amazon CDK, CDK8S
- JKCfg

---

### Deno specific benefits

- No dependencies
- No boilerplate
- Strong security
- Easiest code-reuse

---

### Deploykit OSS

---

### Not necessarily for k8s

- CloudFormation for AWS
- ARM for Azure
- Deployment Manager for Google
- HCL?

---

### What's the future holds

- Dhall
- CUE

---

Thanks!

---

Questions?