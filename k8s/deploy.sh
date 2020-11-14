#! /usr/bin/env bash

set -e

# 1). Build the image:
# * -t is the tag flag, in format name:tag
docker build -t cblair/sails ./

# 2). Push to image repo:
docker push cblair/sails:latest

# 3). Clean out old stuff
kubectl delete deployment sails || true
kubectl delete deployments postgres-deployment || true
kubectl delete service svc-postgres || true
kubectl delete configmap configmap-postgres || true

# 4). Create k8s deployment and deploy:
kubectl create -f ./k8s/config-maps/postgres.yaml
kubectl create -f ./k8s/deployments/postgres.yaml
kubectl create -f ./k8s/deployments/sails.yaml