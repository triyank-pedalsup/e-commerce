# node version 18-alpine
FROM node:18-alpine

# generate the working directory into the docker
WORKDIR /app

# copy package.json and paste into the /app
COPY package*.json ./

# install the exact version of the package.json
RUN npm ci

# copy the src into this /app first one is source and second one is destination
COPY . .
