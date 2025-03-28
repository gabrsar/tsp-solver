FROM node:23-alpine

WORKDIR /app

RUN npm install
COPY . .
RUN npm build

CMD ["node", "dist/main.js"]