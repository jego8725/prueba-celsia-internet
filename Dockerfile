FROM node:20-bullseye

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 9001

CMD ["npm", "start"]