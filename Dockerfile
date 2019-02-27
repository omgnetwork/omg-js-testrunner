FROM node:10-alpine

RUN apk update && apk add shadow git python g++ make

RUN useradd -ms /bin/bash omg

USER omg

COPY . /home/omg/
WORKDIR /home/omg/

RUN git clone https://github.com/omisego/omg-js.git

RUN npm install

ENTRYPOINT ["npm", "run", "start"]
