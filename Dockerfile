FROM node:21.1.0

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn

COPY . .

RUN npx prisma generate

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]