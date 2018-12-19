FROM node:10

RUN apt-get update && npm install --global knex

WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
RUN npm install --production
COPY . .

EXPOSE 8080

CMD ["node", "index.js"]
