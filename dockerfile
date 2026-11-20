FROM node:20-alpine (last pushed 2 weeks ago)

COPY ./backend .

RUN npm install

CMD ["node", "server.js"]
