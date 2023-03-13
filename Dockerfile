FROM node:19.3

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=5001
EXPOSE 5001
CMD [ "npm", "start" ]