FROM node:10-alpine

RUN apk update && apk add shadow git python g++ make

RUN useradd -ms /bin/bash omg

USER omg

COPY . /home/omg/

WORKDIR /home/omg/

RUN git clone https://github.com/omisego/omg-js.git
RUN cd omg-js/ && git pull && git reset --hard $(cat /home/omg/OMG_JS_SHA)
RUN cd omg-js/ && echo "using omg-js sha: $(git rev-parse HEAD)"

RUN cd /home/omg/omg-js/ && npm install

RUN cd /home/omg/ && npm install

ENTRYPOINT ["npm", "run", "start"]
