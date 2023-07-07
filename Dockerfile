# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /src
COPY . .
RUN npm i
RUN npm run build
CMD ["node", "dist/index.js"]
EXPOSE 8080
