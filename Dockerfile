FROM node:21.1.0

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

RUN npx prisma generate

EXPOSE 3000

CMD ["yarn", "start:prod"]