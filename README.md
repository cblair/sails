# sails

This is my [Sails v1](https://sailsjs.com) application that I'm basing project off now. From my past Rails experience, and lots of experience rolling my own 4 tier architectures, I needed a base for projects that:
* had quick additions of migration for new data models
* these migration also produced basic CRUD UI (a la Rails)
* would give me only the API side if desired (no UI)
* works locally the same way as it does in production:
    * deployments to docker locally are quick and are the same as production
    * deployments to a local minikube are quick and are the same as production
    * deployments to a remote kubernetes production service are quick

"Quick" here means ~1 minute. No janky extra manual db migration steps to get production working.
No strange integration issues in production that aren't the same as local development.
No stubs of databases or message services that behave differently in development than production.
Everything that is local is exactly the same as it would be deployed to production.

To achieve this, there's a few things I've done:
* only running sails in a docker/k8s image
* using a database container (i.e. postgres) that the sail images talks to
* for local docker/k8s, using a volume mount that the database container uses
* for production, the k8s database container mounts a gcePersistentDisk, the same way the local containers mount volumes locally


### Links

+ [Sails framework documentation](https://sailsjs.com/get-started)
+ [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)
+ [Professional / enterprise options](https://sailsjs.com/enterprise)


### Version info

This app was originally generated on Sat Oct 31 2020 18:33:04 GMT-0700 (PDT) using Sails v1.4.0.

This project's boilerplate is based on an expanded seed app provided by the [Sails core team](https://sailsjs.com/about) to make it easier for you to build on top of ready-made features like authentication, enrollment, email verification, and billing.  For more information, [drop us a line](https://sailsjs.com/support).

# Development
## Docker

     bash ./dev/run.sh # --build to always rebuild the container

# k8s
## GCE Setup
For GCE, there's three major concepts you need to know and configure:
* project
* zone - geographic zone
* cluster

To login:
* gcloud auth login

When using *gcloud*, `project` and `compute/zone` have to be specified, unless defaults are set:
* `gcloud config set project <project id>`
* `gcloud config set compute/zone <zone>`
** i.e. `gcloud config set compute/zone us-west1-a`

To create a cluster:
* gcloud container clusters create cluster-name --num-nodes=1

Note: nodes are workers.

Then auth with the new cluster. This sets up kubectl:
* gcloud container clusters get-credentials cluster-name

## GCE First time configuration
1). ConfigMaps
Our k8s config for different images. This allows us to have env specific configs.

    kubectl create -f ./k8s/config-maps/postgres.yaml

2). PersistentVolumes
Configuration for a GCE disk and our persistent volume:

    gcloud compute disks create --size=10GB --zone=us-west1-a postgres-disk
    
    # ssh into the GCE VM that has the gcePersistentDisk and format it. https://cloud.google.com/compute/docs/disks/add-persistent-disk#formatting
    # I didn't actually have to do the next line, redeploying auto formatted it to ext4.
    # sudo mkfs.ext4 -m 0 -E lazy_itable_init=0,lazy_journal_init=0 discard /dev/sdb

    kubectl create -f ./k8s/persistent-volume/postgres.yaml

Note the external IP:

    $ kubectl get service sails
    NAME    TYPE           CLUSTER-IP      EXTERNAL-IP      PORT(S)        AGE
    sails   LoadBalancer   10.95.251.109   35.233.252.224   80:31246/TCP   11m

## Deployments
The name version labels are taken from the package.json, so be sure those are what you want, and the version 
HAS BEEN bumped. You'll probably get an old image deployed from docker if you don't.

On the first run, you'll need to [set up a static IP](https://cloud.google.com/kubernetes-engine/docs/tutorials/configuring-domain-name-static-ip) with a matching name as `sails-ip` to match the k8s Ingress name from ./k8s.

## References
* k8s deployments - https://kubernetes.io/docs/concepts/workloads/controllers/deployment/
* https://cloud.google.com/kubernetes-engine/docs/quickstart
* https://hub.docker.com/_/postgres
* https://severalnines.com/database-blog/using-kubernetes-deploy-postgresql
* https://cloud.google.com/kubernetes-engine/docs/tutorials/configuring-domain-name-static-ip

# REST
To enable REST routes for models on a sails app, updated `config/blueprint.js` with:

    rest: true,

# Database

## References
* https://sailsjs.com/documentation/concepts/models-and-orm/model-settings - Database migrations

# UI

## Prerequisites

    npm install --save-dev webpack webpack-dev-server webpack-cli


## References
* https://www.robinwieruch.de/webpack-babel-setup-tutorial
