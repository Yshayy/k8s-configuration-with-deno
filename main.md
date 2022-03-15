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

### How can we write YAMLs easier using Deno and TS?

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

<!-- .slide: class="main" -->

<svg class="w-40 sm:w-auto " width="300" height="81" viewBox="0 0 200 41" fill="none"><path d="M67.7125 13.1266H71.863V24.4704H79.118V28.1062H67.7125V13.1266Z" fill="black"></path><path d="M82.2803 13.1266H86.4678V28.1062H82.2803V13.1266Z" fill="black"></path><path d="M89.6836 13.1266H94.3281L97.7292 22.5969L101.134 13.1266H105.692L99.615 28.2132H95.761L89.6836 13.1266Z" fill="black"></path><path d="M108.859 13.1266H120.907V16.6595H112.968V18.9406H120.157V22.2346H112.968V24.6104H121.014V28.1391H108.859V13.1266Z" fill="black"></path><path d="M124.349 20.6617V20.6164C124.349 16.2518 127.709 12.826 132.246 12.826C135.306 12.826 137.274 14.1107 138.6 15.9512L135.466 18.3682C134.614 17.3018 133.63 16.6142 132.172 16.6142C130.076 16.6142 128.598 18.3929 128.598 20.5752V20.6164C128.598 22.8645 130.076 24.6186 132.172 24.6186C133.737 24.6186 134.643 23.8898 135.553 22.7987L138.678 25.0262C137.278 26.9738 135.376 28.4108 132.057 28.4108C131.037 28.4248 130.025 28.2336 129.081 27.8486C128.137 27.4636 127.28 26.8927 126.561 26.1697C125.842 25.4468 125.275 24.5866 124.895 23.6404C124.515 22.6942 124.329 21.6812 124.349 20.6617Z" fill="black"></path><path d="M145.245 22.5022L139.555 13.1266H144.282L147.366 18.5824L150.466 13.1266H155.111L149.421 22.4363V28.1062H145.245V22.5022Z" fill="black"></path><path d="M155.947 20.6617V20.6164C155.947 16.2518 159.307 12.826 163.844 12.826C166.903 12.826 168.872 14.1107 170.202 15.9512L167.076 18.3682C166.22 17.3018 165.236 16.6142 163.803 16.6142C161.703 16.6142 160.229 18.3929 160.229 20.5752V20.6164C160.229 22.8645 161.703 24.6186 163.803 24.6186C165.363 24.6186 166.273 23.8898 167.183 22.7987L170.309 25.0262C168.896 26.9738 166.99 28.4108 163.671 28.4108C162.65 28.4271 161.636 28.2375 160.69 27.8535C159.744 27.4695 158.885 26.8989 158.164 26.1757C157.443 25.4526 156.875 24.5916 156.495 23.6443C156.114 22.6969 155.927 21.6826 155.947 20.6617Z" fill="black"></path><path d="M173.759 13.1266H177.909V24.4704H185.165V28.1062H173.759V13.1266Z" fill="black"></path><path d="M187.845 13.1266H199.893V16.6595H191.954V18.9406H199.144V22.2346H191.954V24.6104H200V28.1391H187.845V13.1266Z" fill="black"></path><path d="M52.4777 26.0598C51.532 27.0065 50.3672 27.7052 49.0866 28.0937C47.8061 28.4822 46.4494 28.5485 45.1371 28.2867C43.8247 28.025 42.5973 27.4432 41.5638 26.5932C40.5303 25.7431 39.7227 24.651 39.2126 23.4139C38.7026 22.1767 38.5058 20.8327 38.6399 19.5013C38.774 18.1698 39.2348 16.8921 39.9813 15.7815C40.7278 14.6709 41.737 13.7618 42.9193 13.1349C44.1015 12.508 45.4203 12.1827 46.7585 12.1879C47.819 12.1828 48.8702 12.3871 49.8516 12.7892C50.8331 13.1912 51.7255 13.783 52.4777 14.5307L59.4775 7.53095C57.3812 5.43797 54.8012 3.89423 51.9659 3.03645C49.1306 2.17867 46.1275 2.03332 43.2226 2.61328C40.3177 3.19324 37.6006 4.48061 35.3121 6.36137C33.0235 8.24213 31.234 10.6582 30.1022 13.3957C28.9704 16.1332 28.531 19.1075 28.8232 22.0553C29.1153 25.0031 30.1299 27.8333 31.777 30.2954C33.4241 32.7575 35.653 34.7753 38.2662 36.1703C40.8794 37.5653 43.7962 38.2944 46.7585 38.2929C51.5192 38.2881 56.0867 36.4096 59.4733 33.0637L52.4777 26.0598Z" fill="#FF00FF"></path><path d="M20.2746 40.5534L0 20.2746L20.6864 0L27.6779 6.98742L14.3866 20.2746L27.6779 33.566L20.2746 40.5534Z" fill="#3636FF"></path></svg> 



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

### Let's try something new with Deno!

<div style="width: 60%; margin: 0 auto">

![standards](https://imgs.xkcd.com/comics/standards_2x.png)

</div>

<div style="position:relative; top:-20px; font-size:0.4em">** from https://imgs.xkcd.com/comics/standards_2x.png</div>

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
