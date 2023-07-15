FROM node:lts-buster

RUN apt-get update

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "index.js"]
