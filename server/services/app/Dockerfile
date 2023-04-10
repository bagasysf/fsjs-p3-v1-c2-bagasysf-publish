FROM node:lts-hydrogen
WORKDIR /apps
COPY . .
RUN npm install --production
ENV PORT=4001
ENV DATABASE_URL=postgres://postgres:inipasswordyaadikadik@db.aczylcemnwcydsxscctn.supabase.co:6543/postgres
ENV DATABASE_NAME=app
ENV NODE_ENV=production
EXPOSE 4001
CMD ["node", "app.js"]