FROM node:23-alpine

WORKDIR /app

COPY package.json .
RUN npm install

COPY tsconfig.json .
COPY jest.config.ts .

COPY src/  ./src

COPY delivery_points.txt .

CMD ["npm", "start"]