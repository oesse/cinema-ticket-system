FROM node:8-alpine

WORKDIR /usr/src/app

COPY package.json ./
RUN yarn install --production

COPY . .

EXPOSE 8080
CMD ["node", "lib/entry-point.js"]
