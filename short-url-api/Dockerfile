# Stage 1 - the build process
FROM node as builder

RUN mkdir -p /usr/src/builder

WORKDIR /usr/src/builder

COPY . .

RUN yarn install
RUN yarn run build

ENV PORT=3000
ENV NODE_ENV=production
ENV DATABASE_URI=mongodb://short-url-db/short-url


RUN npm i -g pm2

CMD ["pm2-runtime", "./build/main.js"]
