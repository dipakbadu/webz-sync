FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:18-alpine AS production

WORKDIR /usr/src/app

COPY package*.json ./
COPY --from=build /usr/src/app/dist ./dist

RUN npm install --production
EXPOSE 3001

CMD ["node", "dist/main"]
