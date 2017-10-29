FROM node:boron

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN rm -rf node_modules
RUN npm i
RUN npm run build

EXPOSE 3000
CMD ['node', 'dist/index.js']
