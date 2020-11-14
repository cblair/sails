FROM node:12.18.1

WORKDIR /usr/local/app

COPY . /usr/local/app/

RUN npm install -g sails

CMD sails lift
