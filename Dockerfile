FROM node:12.16.2
RUN mkdir /app
RUN mkdir /orders/
COPY . /app
WORKDIR /app
RUN npm install -g typescript
RUN npm install -g ts-node
RUN npm install
