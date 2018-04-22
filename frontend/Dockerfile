FROM node:8-alpine as webpack

WORKDIR /usr/src/app

COPY package.json ./
ENV NODE_ENV=development 
RUN yarn

COPY . .
ENV NODE_ENV=production 
RUN yarn build

FROM nginx:1-alpine
COPY --from=webpack /usr/src/app/dist /usr/share/nginx/html
