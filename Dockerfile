FROM node:12-alpine

COPY . /node
WORKDIR /node

EXPOSE 7000
STOPSIGNAL SIGINT

ENTRYPOINT yarn start
