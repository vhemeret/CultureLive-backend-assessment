FROM node:20-buster-slim

WORKDIR /app

COPY yarn.lock package.json ./

RUN apt-get update -y && apt-get install -y openssl netcat

RUN yarn install

COPY entrypoint.sh /app/
RUN chmod +x /app/entrypoint.sh

COPY . .

CMD ["./entrypoint.sh"] 