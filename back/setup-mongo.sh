#! /bin/bash

docker network create ng
docker run --rm -d \
	--network ng \
	--name mongo -p 27017:27017 \
	-e MONGO_INITDB_ROOT_USERNAME=admin \
	-e MONGO_INITDB_ROOT_PASSWORD=secretpw \
	mongo
