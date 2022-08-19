#!/bin/bash

docker run -it \
    -e AWS_ACCESS_KEY_ID \
    -e AWS_SECRET_ACCESS_KEY \
    -e AWS_REGION \
    -w /app \
    -v "$HOME/.pulumi/credentials.json:/root/.pulumi/credentials.json" \
    -v "$(pwd)":/app \
    --entrypoint bash \
    pulumi/pulumi:3.38.0 \
    -c "pulumi plugin install resource aws v5.10.0 && npm install && npm install -g ts-node typescript && ts-node ./index.ts"
