---
theme: simple
center: false
---

<!-- .slide: class="main" -->

<link rel="stylesheet" type="text/css" href="./livecycle.css" />

### Experimenting with Deno  
### for easier k8s deployments


<div style="text-align:center">
<div>Yshay Yaacobi</div>
<div>@yshayy</div>
<div>https://git.io/fxh57</div>
</div>

---

### ![Kubernetes](https://kubernetes.io/images/favicon.png){style=width:80px;border:none;box-shadow:none;vertical-align:middle;margin-top:5px} Kubernetes

> "Open-source container-orchestration system for automating computer application deployment, scaling, and management." {style=text-align:left}

*Source: Wikipedia{style=font-size:16px;text-align:right;margin-right:160px;font-weight:bold}

---


### ![Kubernetes](https://kubernetes.io/images/favicon.png){style=width:80px;border:none;box-shadow:none;vertical-align:middle;margin-top:5px} Kubernetes

* Created by Google, backed by all major cloud providers
* The heart of the "cloud-native" ecosystem
* Most popular way to run container workloads at scale

---

### ![Deno](https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Deno.svg/1200px-Deno.svg.png){style=width:100px;border:none;box-shadow:none;vertical-align:middle;margin-top:5px} Deno

> "Deno is a runtime for JavaScript and TypeScript that is based on the V8 JavaScript engine and the Rust programming language." {style=text-align:left}

*Source: Wikipedia{style=font-size:16px;text-align:right;margin-right:160px;font-weight:bold}

---

### ![Deno](https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Deno.svg/1200px-Deno.svg.png){style=width:100px;border:none;box-shadow:none;vertical-align:middle;margin-top:5px} Deno

- Created by Ryan Dahl (Node.js creator)
- The next evolution of Node.js (?)

---

<!-- .slide: class="main" -->

### Experimenting with Deno  
### for easier k8s deployments (?!)

<!-- 2m --->

---

![Yshay Yaacobi](https://github.com/yshayy.png?size=150){style=float:right;margin-right:40px;border-radius:75px;border:none}
### About me 

- CTO of livecycle
- Full-Stack engineer
- Heavily used kubernetes in the past 5 years
- OSS Maintainer of Tweek (git.io/tweek)
- Ex-Prinicipal Enginner at Soluto

---

### Agenda

- Quick recap of kubernetes resource model <icon/>
- YAMLs, Helm and the mess we're in <icon/>
- Deno for the resque <icon/>
- Summary and notes <icon/>

<!-- 3m --->

---

### Kubernetes Resource Model

- Resources 
- Controllers
- ....
- Profit 💵💵

---

### Declarative, awesome

- Everything is a resource
- Every resource described with YAML/JSON
- Extensible
- Support extremely complex workloads

---

#### Let's start with running something simple

- Pod

---

#### Now let's add more stuff

- Deployment 
- Service {.fragment}
- ConfigMap {.fragment}
- Ingress {.fragment}
- Secrets {.fragment}
- PVCs {.fragment}
- PDBs {.fragment}

---

#### And then, there are Custom Resources

- Monitor
- Function
- Snapshot
- Canary
- ...

<!-- 7m --->

---

<!-- .slide: class="main" -->

#### A single kubernetes service definition can be **huge**.
#### And it's even more diffiuclt when running a full cloud-native/distributed app

---

#### Can it be simpler, sander and less bloated?

- Well... Yes, Probably
- Many have tried

---

#### SO Many...

Helm, OC new-app, Kompose, Spread, Draft, Ksonnet/Kubecfg, Databricks Jsonnet, Kapitan, Konfd, Templates/Ktmpl, Fabric8 client, Kubegen, kenv, Ansible, Puppet, KPM, Nulecule, Kedge (OpenCompose is deprecated), Chartify, Podex, k8sec, kb80r, k8s-kotlin-dsl, KY, Kploy, Kdeploy, Kubernetes-deploy, Generator-kubegen, K8comp, Kontemplate, Kexpand, Forge, Psykube, Koki, Deploymentizer, generator-kubegen, Broadway, Srvexpand, Rok8s-scripts, ERB-Hiera, k8s-icl, sed, envsubst, Jinja, spiff {style=font-size:20px}

(taken from https://github.com/kubernetes/community/blob/master/contributors/design-proposals/architecture/declarative-application-management.md) {style=font-size:14px}

---

<!-- 8.5m --->

<!-- .slide: class="main" -->

### Let's grab a look at the popular ones

---

### Quick glance - Helm

- Template based
- Parameterized 
- DEMO: Simple chart example
- DEMO: Complex chart example

---

### Helm Pros

- Templating
- Paramaritization
- Distributed package registry

---

### Helm Cons

- Editing is difficult
- Everything is text based
- Difficult to validate
- Lots of duplicate parameterization with k8s
- No idiomatic way to "patch" charts

---

<!-- .slide: class="main" -->

### Quick glance - Kustomize

- Overlay instead of parameterization 
- DEMO: Simple overlay

---

### Kustomize Pros

- Simple, no need to learn new stuff
- Lots of utility methods
- Built-in with kubectl (-k)

---

### Kustomize Cons

- Limited

---

### Helm + Kustomize toghter

---

<!-- .slide: class="main" -->

### Let's step back

---

<!-- .slide: class="main" -->

### What's important?

---

### Composition

- Code reuse - ability to reuse definitions or functions in different places
- Abstraction - ability to create high level pieces
- Parametrization - ability to reuse definitions with different paramaters

---

### Correctness

- Type safety 
- Testability 

---

### Code Sharing

- External imports
- Package management

---

### Developer friendly

- Familiar Programming language 
- IDE Support
- No boilerplact

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
| Package management    |   	    |           	|   
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

- Superset of javascript
- Extremly strong type-system

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

- Import Example

---

### And it secure

- Importing malicious package

---

### Ingredients

- Deno
- Type generation
- Code re-use building-blocks
- That's all (!)

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

|                      	| Helm  	|  Kustomize 	|   Deno 
|----------------------	|-------	|-----------    |-------    |  
| Composition                                                ||||   
| Code-Reuse            |   	    |               |        	|   
| Abstraction           |   	    |               |        	|   
| Parametrization       |   	    |               |        	|   
| Overlays              |           |               |           |
| Correctness                                                ||||   
| Type-Safety           |   	    |               |        	|   
| Testability           |   	    |               |        	|   
| Code Sharing                                               ||||   
| Exteranl imports     	|           |               |           |   
| Package management    |   	    |               |        	|   
| Developer friendly                                         ||||   
| Familiar PL        	|   	    |               |        	|   
| IDE support          	|   	    |               |        	|   
| No Boilerplate        |   	    |               |        	|   
| Security                                                   ||||   
| Runtime              	|   	    |               |        	|   
| Sandbox              	|   	    |               |        	|   
{.feature-table}



---

### Closing notes

---

### Deno for configuration

- There are benefits of using a real programming language, for configuration
- Especially 

---

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