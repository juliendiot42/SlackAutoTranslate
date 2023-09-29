FROM node:20.7-alpine3.18
# Create app directory
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
CMD [ "node", "index.js" ]