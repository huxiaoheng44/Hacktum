FROM node:18-slim

WORKDIR /hacktum-check24-backend

COPY ./package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]