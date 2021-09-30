#!/usr/bin/env bash

# Use this if you just want to stay attached to the docker build.
# docker-compose up --build

# Use this to deattach, and then root in to the container to run
# stuff manually.
docker-compose up --build -d
sleep 1
docker exec -ti sails_web_1 bash -c 'cd && exec "${SHELL:-sh}"'