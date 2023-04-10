FROM node:lts-hydrogen
WORKDIR /apps
COPY . .
RUN npm install --production
ENV PORT=4000
EXPOSE 4000
CMD ["node", "app.js"]