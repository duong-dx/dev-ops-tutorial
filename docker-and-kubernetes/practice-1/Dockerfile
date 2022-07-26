# đề bài :
# create nodejs web app
# create a dockerfile
# build image from Dockerfile
# Run image as container\
# commect to web app from a browser

# install image

FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./
# install and update packages

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]