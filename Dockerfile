FROM node
USER root

ARG APP=app
ARG HOME=/home/node

WORKDIR $HOME/$APP/

COPY . $HOME/$APP/

ENV NPM_CONFIG_PREFIX=$HOME/.npm-global
ENV PATH=$PATH:$HOME/.npm-global/bin

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]
