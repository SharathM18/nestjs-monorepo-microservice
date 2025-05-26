FROM node:22-alpine

RUN apk add --no-cache python3 g++ make

WORKDIR /user/src/app

COPY ../../package.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "dist/main.js" ]
