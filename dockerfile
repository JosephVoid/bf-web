FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm config set fetch-retries 10
RUN npm install -g npm --verbose
RUN npm install --verbose
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]