FROM node:12.18-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "./"]
RUN yarn install
COPY . .
EXPOSE 3000
CMD ["yarn", "run", "start"]
