FROM node:20.7-alpine3.18
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY detectLang.js ./
COPY index.js ./
COPY translate.js ./
CMD [ "node", "index.js" ]