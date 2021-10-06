FROM node:12.18.1

WORKDIR /usr/local/app

COPY . /usr/local/app/

# RUN npm install -g sails npm-run-all webpack webpack-cli webpack-dev-middleware webpack-dev-server webpack-merge 
RUN npm install -g sails npm-run-all
RUN npm ci

#TODO - @babel/preset-react in .babelrc is what is causing the babel / @babel/core 6/7 version error. Sort that out
# with the web stuff

# Run this to start things automatically on dev startup,
# although code changes require a whole docker rebuild
# CMD npm run start:dev
# This and our dev/run.sh instead allows you to root in and run sails, and 
# restart for code changes without a docker rebuild.
CMD sleep 10000000
