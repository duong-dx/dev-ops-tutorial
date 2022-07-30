FROM node:16-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . .

RUN npm run build

FROM nginx

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

EXPOSE 3005

CMD ["nginx", "-g", "daemon off;"]
