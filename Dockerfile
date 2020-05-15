FROM node:10-alpine

RUN apk update && apk add shadow git python g++ make curl

WORKDIR /app

RUN git clone https://github.com/omisego/omg-js.git

RUN cd omg-js && npm install

ENTRYPOINT ["npm", "run", "ci-baseline-test"]
