---
theme: simple
center: false
---

<!-- .slide: class="main" -->

<link rel="stylesheet" type="text/css" href="./livecycle.css" />

<script>
  const el = document.createElement("div")
  el.textContent = "@yshayy"
  el.className = "author"
  document.body.appendChild(el)
</script>

### Experimenting with Deno  
### for easier k8s deployments


Yshay Yaacobi  
yshay@livecycle.io  
@yshayy  
https://git.io/J49q9  

---

<!-- .slide: class="main" -->

### Let's talk a bit about YAMLs

<div position="relative">

<div class="fragment fade-in"
 style="transform: rotateZ(5deg) scale(0.8)">

```yaml
name: AWS-CD

on:
  push:
    branches:
      - master
jobs:
  build:
    runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v1
        - name: Install Node packages
          run: npm install
        - name: Build the project
          run: npm run build
        - name: Deploy to S3
          run: AWS_ACCESS_KEY_ID=${{ secrets.AWS_ACCESS_KEY_ID }} AWS_SECRET_ACCESS_KEY=${{ secrets.AWS_SECRET_ACCESS_KEY }} aws s3 sync dist s3://${{ secrets.S3_BUCKET_NAME }}/
```

</div>

<div class="fragment fade-in"
 style="position:absolute; top: 80px; left:150px;transform: rotateZ(-5deg) scale(1.1)">

```yaml
version: '3.3'
services:
   db:
     image: mysql:5.7
     volumes:
       - db_data:/var/lib/mysql
     restart: always
     environment:
       MYSQL_ROOT_PASSWORD: somewordpress
       MYSQL_DATABASE: wordpress
       MYSQL_USER: wordpress
       MYSQL_PASSWORD: wordpress
   wordpress:
     depends_on:
       - db
     image: wordpress:latest
     ports:
       - "8000:80"
     restart: always
     environment:
       WORDPRESS_DB_HOST: db:3306
       WORDPRESS_DB_USER: wordpress
       WORDPRESS_DB_PASSWORD: wordpress
       WORDPRESS_DB_NAME: wordpress
volumes:
    db_data: {}
```

</div>

<div class="fragment fade-in"
 style="position:absolute; top: 140px; left:-60px;transform: rotateZ(-2deg) scale(0.7)">

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Metadata:
  License: Apache-2.0
Description: 'AWS CloudFormation Sample Template EC2InstanceWithSecurityGroupSample:
  Create an Amazon EC2 instance running the Amazon Linux AMI.'
Parameters:
  KeyName:
    Description: Name of an existing EC2 KeyPair to enable SSH access to the instance
    Type: AWS::EC2::KeyPair::KeyName
    ConstraintDescription: must be the name of an existing EC2 KeyPair.
  InstanceType:
    Description: WebServer EC2 instance type
    Type: String
    Default: t3.small
    AllowedValues: [t2.nano, t2.micro, t2.small, t2.medium, t2.large, t2.xlarge, t2.2xlarge,
      d2.xlarge, d2.2xlarge, d2.4xlarge, d2.8xlarge]
    ConstraintDescription: must be a valid EC2 instance type.
Resources:
  EC2Instance:
    Type: AWS::EC2::Instance
    Properties:
      InstanceType: !Ref 'InstanceType'
      SecurityGroups: [!Ref 'InstanceSecurityGroup']
      KeyName: !Ref 'KeyName'
      ImageId: !Ref 'LatestAmiId'
  InstanceSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Enable SSH access via port 22
      SecurityGroupIngress:
      - IpProtocol: tcp
        FromPort: 22
        ToPort: 22
        CidrIp: !Ref 'SSHLocation'
Outputs:
  InstanceId:
    Description: InstanceId of the newly created EC2 instance
    Value: !Ref 'EC2Instance'
  AZ:
    Description: Availability Zone of the newly created EC2 instance
    Value: !GetAtt [EC2Instance, AvailabilityZone]
  PublicDNS:
    Description: Public DNSName of the newly created EC2 instance
    Value: !GetAtt [EC2Instance, PublicDnsName]
  PublicIP:
    Description: Public IP address of the newly created EC2 instance
    Value: !GetAtt [EC2Instance, PublicIp]
```

</div>

</div>


---

<!-- .slide: class="main" -->

<div style="font-size: 0.8em" >

### At first it was terrible...
### Yet, I got used to that 😎 {.fragment .fade-in}
### But then, there's kubernetes YAMLs 😱😱😱 {.fragment .fade-in} 

</div>

---

<!-- .slide: class="main" -->

### How can we make writing YAMLs easier with Deno and TS

---

<div style="float:right;font-size:18px;margin-right:40px">

![Yshay Yaacobi](https://github.com/yshayy.png?size=150){style=border-radius:75px;border:none}

yshay@livecycle.io  
@yshayy

</div>

<!-- .slide: class="main" -->

### About me 

<div style="font-size: 0.8em">

- CTO of Livecycle (https://livecycle.io)
- Software engineer
- Heavily used kubernetes in the past 5 years
- OSS Maintainer of Tweek (git.io/tweek)

</div>

---


### About Livecycle 

- Next generation collaboration tools for development teams
- Continuous playground environments 
- Bridging the gap between coders & non-coders
- Currently in public beta, check it out on https://livecycle.io

---

### Agenda

- Looking at k8s yamls
- Deployment configuration in Deno
- Summary

<!-- 3m --->

---

### Kubernetes Resource Model

![architecture](https://raw.githubusercontent.com/kubernetes/design-proposals-archive/main/architecture/images/apiserver.png){style=border:none}

---

### Declarative, awesome

- Infrastructure as data
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

<!-- .slide: class="main" -->

#### A single kubernetes service definition can be **huge**.
#### And it's even more diffiuclt when running a full cloud-native/distributed app

---

#### Can it be simpler, saner and less bloated?

- Well... Yes, Probably
- There are many tools & solution for this problem

---

#### SO Many...

Helm, OC new-app, Kompose, Spread, Draft, Ksonnet/Kubecfg, Databricks Jsonnet, Kapitan, Konfd, Templates/Ktmpl, Fabric8 client, Kubegen, kenv, Ansible, Puppet, KPM, Nulecule, Kedge (OpenCompose is deprecated), Chartify, Podex, k8sec, kb80r, k8s-kotlin-dsl, KY, Kploy, Kdeploy, Kubernetes-deploy, Generator-kubegen, K8comp, Kontemplate, Kexpand, Forge, Psykube, Koki, Deploymentizer, generator-kubegen, Broadway, Srvexpand, Rok8s-scripts, ERB-Hiera, k8s-icl, sed, envsubst, Jinja, spiff {style=font-size:26px}

(taken from https://github.com/kubernetes/community/blob/master/contributors/design-proposals/architecture/declarative-application-management.md) {style=font-size:14px}


---

<!-- .slide: class="main" -->

![standards](https://imgs.xkcd.com/comics/standards_2x.png)

### Let's try something else with Deno!

---

### ![Deno](https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Deno.svg/1200px-Deno.svg.png){style=width:100px;border:none;box-shadow:none;vertical-align:middle;margin-top:5px} Deno

> "Deno is a runtime for JavaScript and TypeScript that is based on the V8 JavaScript engine and the Rust programming language." {style=text-align:left}

*Source: Wikipedia{style=font-size:16px;text-align:right;margin-right:160px;font-weight:bold}

---

### ![Deno](https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Deno.svg/1200px-Deno.svg.png){style=width:100px;border:none;box-shadow:none;vertical-align:middle;margin-top:5px} Deno

- Created by Ryan Dahl (Node.js creator)
- Secure runtime for typescript/javascript
- Inspired by browser APIs and the Go ecosystem/tooling
- The next evolution of Node.js (?)

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

#### Not perfect

- Need to use some code-generation for getting k8s types
- K8S OpenAPI defintions are not always reliable for validation
- Typescript type-system is not sound
- Need utility libaries for advanced case

---

<!-- .slide: class="main" -->

### Let's take a step back

---

<!-- .slide: class="main" -->

### What's important?

---

#### Composition

- Declarative
- Parametrization
- Abstraction
- Overlays 

---

#### Correctness

- Type safety - Easy to identify, understand and validate resource types 
- Testability - Easy to create tests that validate configuration

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

- Runtime
- Code Analysis

---

![Meme Great Success - Borat T Shirt Clipart@pikpng.com](./images/great.png){style=height:160px;border:none;margin:0;box-shadow:none;margin-top:-30px}

|                      	| Helm  	|  Kustomize 	|  Deno   |   | 
|----------------------	|-------	|-----------	|-----    |-- |
| Composition                                                  ||||   
| Code-Reuse            | {.r2}  	|  {.r2}        |  {.r3}  |   |   
| Abstraction           | {.r1}  	|  {.r0}       	|  {.r3}  |   |   
| Parametrization       | {.r2}  	|  {.r1}       	|  {.r3}  |   |   
| Overlays              | {.r0}     |  {.r3}        |  {.r3}  |   |
| Correctness                                                  ||||   
| Type-Safety           | {.r1}     |  {.r2}       	|  {.r3}  |   |   
| Testability           | {.r2}     |  {.r2}        |  {.r3}  |   |   
| Code Sharing                                      |          ||||   
| External imports     	| {.r2}     |  {.r0}        |  {.r3}  |   |     
| Package management    | {.r3}     |  {.r0}        |  {.r2}  |   |   
| Developer friendly                                           ||||   
| Familiar PL        	| {.r2}     |   {.r3}       |  {.r3}  |   |   
| IDE support          	| {.r2}     |   {.r2}      	|  {.r3}  |   |  
| Minimal Boilerplate   | {.r1}     |   {.r2}      	|  {.r3}  |   |   
| Security                                                     ||||   
| Runtime              	| {.r3}     |  {.r3}        |  {.r2}  |   |  
| Code Analysis         | {.r2}     |  {.r2}        |  {.r3}  |   |
{.feature-table}

---

### Summary

---


<!-- .slide: class="main" -->


#### There are many benefits of using a **general-purpose** programming language for configuration

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
- Toolkit, not a framework
- Type generation based on k8s openapi and several CRDs
- Basic building blocking for composition and code-reusing
- Can easily be integrated with other tools (tilt/argo/etc...)
- Open source
- https://git.io/J4XIT

---

<!-- .slide: class="main" -->

### Not necessarily only for k8s

---

<!-- .slide: data-visibility="hidden" -->

### What's the future holds

- Dhall
- CUE (and Dagger)

---

<!-- .slide: class="main" -->

### Your configuration files
### can and **should** be a lot **simpler**

---

<!-- .slide: class="main" -->

# Thank You!


<div style="font-size:28px; width: 300px; margin: 80px auto">

![Yshay Yaacobi](https://github.com/yshayy.png?size=70){style=float:left;margin-top:3px;border-radius:35px;border:none}

Yshay Yaacobi  
@yshayy  

</div>

<div style="text-align:center">

Slides and examples at https://git.io/J49q9  {style=font-size:20px}

</div>


---

<!-- .slide: class="main" -->

## Questions?

<div style="font-size:28px; width: 300px; margin: 80px auto">

![Yshay Yaacobi](https://github.com/yshayy.png?size=70){style=float:left;margin-top:3px;border-radius:35px;border:none}

Yshay Yaacobi  
yshay@livecycle.io
@yshayy  

</div>

<div style="text-align:center">

Slides and examples at https://git.io/J49q9  {style=font-size:20px}

</div>
