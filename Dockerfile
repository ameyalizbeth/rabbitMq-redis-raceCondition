FROM node:18 as builder
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install

FROM node:18.15.0-alpine3.16
ARG START_SCRIPT
ENV START_COMMAND=$START_SCRIPT
WORKDIR /home/node/app
COPY --from=builder /home/node/app/node_modules ./node_modules
COPY . .
RUN npm run build
EXPOSE 3000
CMD npm run $START_COMMAND