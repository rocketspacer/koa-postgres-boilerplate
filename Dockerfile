FROM node:10

RUN apt-get update && apt-get install --yes \
  python2.7 \
  python-pip

WORKDIR /usr/src/app
COPY package*.json .
RUN npm install --production
COPY . .

EXPOSE 8080

CMD ["node", "index.js"]
