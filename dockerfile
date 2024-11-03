
FROM node:20-slim
WORKDIR /usr/src/app
COPY package*.json /
RUN npm install
COPY . .
ENV NODE_ENV=production
RUN npm run build
EXPOSE 5050
CMD ["npm", "start"]