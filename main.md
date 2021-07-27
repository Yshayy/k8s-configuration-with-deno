---
theme: simple
center: false
---

<!-- .slide: class="main" -->

<link rel="stylesheet" type="text/css" href="./livecycle.css" />

### Experimenting with Deno  
### for easier k8s deployments


Yshay Yaacobi  
@yshayy  
https://git.io/J49q9  

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
- Secure runtime for typescript/javascript
- Inspired by browser APIs and Go ecosystem/tooling
- The next evolution of Node.js (?)

---

<!-- .slide: class="main" -->

### Experimenting with Deno  
### for easier k8s deployments? 🤔

<!-- 2m --->

---

![Yshay Yaacobi](https://github.com/yshayy.png?size=150){style=float:right;margin-right:40px;border-radius:75px;border:none}
### About me 

- CTO of livecycle
- Software engineer
- Heavily used kubernetes in the past 5 years
- OSS Maintainer of Tweek (git.io/tweek)

---

### Agenda

- Quick recap of kubernetes resource model
- YAMLs, Helm and the mess we're in
- Deno for the resque
- Summart & Questions

<!-- 3m --->

---

### Kubernetes Resource Model

![architecture](https://github.com/kubernetes/community/raw/master/contributors/design-proposals/architecture/images/apiserver.png){style=border:none}

---

### Declarative, awesome

- Everything is a **resource**
- Every resource described with YAML/JSON
- Extensible (Custom Resources)
- Supports variety of resources
- Supports extremely complex workloads

---

<!-- .slide: data-visibility="hidden" -->

#### Let's start with running something simple

- Pod

---

<!-- .slide: data-visibility="hidden" -->

#### Now let's add more stuff

- Deployment 
- Service {.fragment}
- Ingress {.fragment}
- ConfigMap {.fragment}
- Secrets {.fragment}
- PVCs {.fragment}
- PDBs {.fragment}

---

<!-- .slide: data-visibility="hidden" -->

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
- There are many tools & solution for this problem

---

#### SO Many...

Helm, OC new-app, Kompose, Spread, Draft, Ksonnet/Kubecfg, Databricks Jsonnet, Kapitan, Konfd, Templates/Ktmpl, Fabric8 client, Kubegen, kenv, Ansible, Puppet, KPM, Nulecule, Kedge (OpenCompose is deprecated), Chartify, Podex, k8sec, kb80r, k8s-kotlin-dsl, KY, Kploy, Kdeploy, Kubernetes-deploy, Generator-kubegen, K8comp, Kontemplate, Kexpand, Forge, Psykube, Koki, Deploymentizer, generator-kubegen, Broadway, Srvexpand, Rok8s-scripts, ERB-Hiera, k8s-icl, sed, envsubst, Jinja, spiff {style=font-size:26px}

(taken from https://github.com/kubernetes/community/blob/master/contributors/design-proposals/architecture/declarative-application-management.md) {style=font-size:14px}

---

<!-- 8.5m --->

<!-- .slide: class="main" -->

### Let's take a look at the popular ones

---

### ![Helm](https://helm.sh/img/helm.svg){style=width:100px;border:none;box-shadow:none;vertical-align:middle;margin-top:5px}

- Parameterized
- Template based

---

### ![Helm](https://helm.sh/img/helm.svg){style=width:100px;border:none;box-shadow:none;vertical-align:middle;margin-top:5px} Demo

---

#### Helm Pros

- Mature and has wide adoption
- Distributed package registries with thousands of charts
- CLI for managing deployment-livecycle

---

#### Helm Cons

- Composing a chart is **difficult**
- Everything is text based
- Hard to validate
- Lots of duplicate parameterization with k8s

---

#### Helm chart size and paramater creep

- Bitnami Redis chart (+200 paramaters, +3000 loc)
- NATs offical chart (+100 paramaters, +1000 loc)
- Most paramaters overlap with k8s yamls 

---

<!-- .slide: class="main" -->

#### Quick glance - Kustomize

- Template free customization
- Overlaying 
- Transformation

---

#### Kustomize - demo

---

#### Kustomize Pros

- Simple, easy to learn
- We can customize any resource field
- Doesn't hide k8s apis
- Many utility functions that deal with real-world cases
- Understand YAML semantics
- Built-in with kubectl (apply -k)

---

#### Kustomize Cons

- Less suited for creating abstraction
- Limited code-reuse
- No story for packaging or external dependencies

---

#### Helm + Kustomize toghter

- With helm post-rendering
- We can used Helm charts + Kustomize overlays

---

<!-- .slide: class="main" -->

# ![🤯 🤯 🤯 ](http://www.reactiongifs.com/r/2013/10/tim-and-eric-mind-blown.gif){style=width:600px;border:none}

---

<!-- .slide: class="main" -->

### Let's take a step back

---

<!-- .slide: class="main" -->

### What's important?

---

#### Composition

- Code reuse - ability to reuse definitions or functions in different places
- Parametrization - ability to reuse definitions with different Parameters
- Abstraction - ability to create high level pieces

---

#### Correctness

- Type safety 
- Testability   

---

#### Code Sharing

- External imports
- Package management

---

#### Developer friendly

- Familiar Programming language 
- IDE Support
- Minimal boilerplate

---

#### Security

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

.feature-table td.r0{
    background-color:#475248;
}

.feature-table td.r1{
    background-color:#BF3C3A;
}

.feature-table td.r2{
    background-color:#FBD431;
}

.feature-table td.r3{
    background-color:#85c23d;
}

.feature-table th:nth-child(4), .feature-table td:nth-child(4){
    display: none
}


.feature-table td[colspan] {
    background-color:black;
    color: white;
    font-size: 18px;
    font-weight: bold;
}
</style>

|                      	| Helm  	|  Kustomize 	|   | 
|----------------------	|-------	|-----------	|-- |
| Composition                                         |||   
| Code-Reuse            | {.r2}  	|  {.r2}        |   |   
| Abstraction           | {.r1}  	|  {.r0}       	|   |   
| Parametrization       | {.r2}  	|  {.r1}       	|   |   
| Overlays              | {.r0}     |  {.r3}        |   |
| Correctness                                         |||   
| Type-Safety           | {.r1}     |  {.r2}       	|   |   
| Testability           | {.r2}     |  {.r2}        |   |   
| Code Sharing                                        |||   
| External imports     	| {.r2}     |  {.r0}        |   |     
| Package management    | {.r3}     |  {.r0}        |   |   
| Developer friendly                                  |||   
| Familiar PL        	| {.r2}     |   {.r3}       |   |   
| IDE support          	| {.r2}     |   {.r2}      	|   |  
| Minimal Boilerplate   | {.r1}     |   {.r2}      	|   |   
| Security                                            |||   
| Runtime              	| {.r3}     |  {.r3}        |   |  
| Static Analysis       | {.r2}     |  {.r2}        |   |
{.feature-table}

---

<!-- .slide: class="main" -->

### Questions?

---

### Let's take a look at **Deno**

![Deno](https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Deno.svg/1200px-Deno.svg.png){style=width:400px;border:none;box-shadow:none;vertical-align:middle;margin-top:5px} 

---

### CLI

- DEMO: Exploring Deno cli

---

### Typescript

- Superset of javascript
- Extremely powerful type-system

---

<!-- .slide: data-visibility="hidden" -->

### Let's create a k8s Objects

- Pod
- Service
- Deployment

---

<!-- .slide: data-visibility="hidden" -->

### Let's use high level abstraction

- Microservice

---

<!-- .slide: data-visibility="hidden" -->

### Let's create a test


---

<!-- .slide: data-visibility="hidden" -->

### Importing external package

- Import Example

---

<!-- .slide: data-visibility="hidden" -->

### And it has sandbox security

- Importing malicious package

---

### Ingredients

- Deno
- Type generation
- Code re-use building-blocks
- That's all (!)

---

### Not all is perfect

- Need to use some code-generation for getting k8s types
- K8S OpenAPI defintions are not always reliable for validation
- Typescript type-system is not sound
- Missing standard and utility libaries for this case

---

### Questions

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

### Summary

---

<!-- .slide: class="main" -->


#### There are many benefits of using a **real** programming language for configuration

---

### It was done before

- Pulumi
- AWS CDK, CDK8S
- JKCfg

---

### Deno specific benefits

- No dependencies
- No boilerplate
- Strong and flexible security
- Easiest code-reuse
- Good ecosystem

---

### Deploykit

- Deno-based small experimental library
- Type generation based on k8s openapi and several CRDs
- Basic building blocking for composition and code-reusing
- Open source
- https://git.io/J4XIT

---

### Not necessarily only for k8s

- CloudFormation for AWS
- ARM for Azure
- Deployment Manager for Google

---

### What's the future holds

- Dhall
- CUE (and Dagger)

---

#### Your k8s deployments
#### can and should be a lot simpler

---

Thanks!

---

Questions?