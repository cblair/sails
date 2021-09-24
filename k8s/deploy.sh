#! /usr/bin/env bash

set -ev

export IMAGE_NAME=cblair/sails
export IMAGE_VERSION=`jq -r ".version" package.json`

echo "Deploying $IMAGE_NAME:$IMAGE_VERSION..."

# 1). Build the image:
# * -t is the tag flag, in format name:tag
docker build -t $IMAGE_NAME:$IMAGE_VERSION ./

# 2). Push to image repo:
docker push $IMAGE_NAME:$IMAGE_VERSION

# 3). Clean out old stuff
kubectl delete deployment sails || true
kubectl delete deployments postgres-deployment || true
kubectl delete service svc-postgres || true
kubectl delete service sails || true
kubectl delete configmap configmap-postgres || true

# 4). Create k8s and deploy:
kubectl create -f ./k8s/config-maps/postgres.yaml
kubectl create -f ./k8s/deployments/postgres.yaml
envsubst < ./k8s/deployments/sails.yaml | kubectl create -f -
kubectl create -f ./k8s/services/sails.yaml

echo "Done deploying $IMAGE_NAME:$IMAGE_VERSION."