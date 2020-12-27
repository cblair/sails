FROM node:12.18.1

WORKDIR /usr/local/app

COPY . /usr/local/app/

RUN npm install -g sails npm-run-all webpack webpack-cli webpack-dev-middleware webpack-dev-server webpack-merge 
RUN npm install

CMD npm run start
