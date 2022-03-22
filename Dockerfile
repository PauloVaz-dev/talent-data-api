FROM node:14

WORKDIR /usr/app

COPY package.json /usr/app/

RUN yarn install

COPY . . 

EXPOSE 8080

CMD ["npm", "run", "start:dev"]