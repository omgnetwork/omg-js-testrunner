FROM node:10-alpine

RUN apk update && apk add shadow git python g++ make

RUN useradd -ms /bin/bash omg

USER omg

COPY . /home/omg/
WORKDIR /home/omg/
RUN npm install

ENTRYPOINT ["npm", "run", "start"]
