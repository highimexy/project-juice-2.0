# project-juice-2.0-backend/Dockerfile

FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# WAŻNE: Upewnij się, że Twój backend nasłuchuje na tym porcie!
EXPOSE 5000
CMD ["node", "index.js"]