FROM node:18-alpine

WORKDIR /hacktum-check24-frontend


COPY ./package*.json ./


RUN npm install

COPY ./src ./src
COPY ./public ./public


CMD ["npm", "start"]