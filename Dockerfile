FROM node:12.18.1

WORKDIR /usr/local/app

COPY . /usr/local/app/

# RUN npm install -g sails npm-run-all webpack webpack-cli webpack-dev-middleware webpack-dev-server webpack-merge 
RUN npm install -g sails npm-run-all
RUN npm ci

#TODO - @babel/preset-react in .babelrc is what is causing the babel / @babel/core 6/7 version error. Sort that out
# with the web stuff

CMD npm run start:dev
