FROM node:16.20.2-alpine
WORKDIR /app
COPY . /app
RUN npm ci
CMD npm start
EXPOSE 3000