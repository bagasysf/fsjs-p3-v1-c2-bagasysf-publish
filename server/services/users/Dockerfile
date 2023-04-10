FROM node:lts-hydrogen
WORKDIR /apps
COPY . .
RUN npm install --production
ENV PORT=4002
ENV DATABASE_URL=mongodb+srv://bagasysf:xRcBRpUMXQ4bcESa@rumaisho.elzi0wa.mongodb.net/test
ENV DATABASE_NAME=users
EXPOSE 4002
CMD ["node", "app.js"]

