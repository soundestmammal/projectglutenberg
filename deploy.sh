#!/bin/bash
docker build -t soundestmammal/oasis-client ./client
docker build -t soundestmammal/oasis-nginx ./nginx
docker build -t soundestmammal/oasis-server ./server
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_ID" --password-stdin
docker push soundestmammal/oasis-client
docker push soundestmammal/oasis-nginx
docker push soundestmammal/oasis-server