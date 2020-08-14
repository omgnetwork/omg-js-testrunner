FROM node:12-alpine

# Need curl to call slack APIs
RUN apk update && apk add shadow git python g++ make curl

RUN useradd -ms /bin/bash omg
USER omg

COPY . /home/omg/

WORKDIR /home/omg/

RUN git clone https://github.com/omisego/omg-js.git
RUN cd omg-js/ && git pull && git reset --hard $(cat /home/omg/OMG_JS_SHA)
RUN cd omg-js/ && echo "using omg-js sha: $(git rev-parse HEAD)"

# WARNING: omg-js has a postinstall hook that will only be working if not running as root
# https://stackoverflow.com/questions/47748075/npm-postinstall-not-running-in-docker
# Since we are running as user: `omg` so it will be fine here
RUN cd omg-js && npm install

WORKDIR /home/omg/omg-js
