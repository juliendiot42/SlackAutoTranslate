FROM node:20.7-alpine3.18
# Create app directory
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev
COPY . .
CMD [ "node", "index.js" ]