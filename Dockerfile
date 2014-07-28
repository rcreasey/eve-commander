FROM node
MAINTAINER Ryan Creasey "ryan@kaneda.net"

ADD . /src
WORKDIR /src

RUN npm install

ENV PORT 5000
EXPOSE 5000

CMD ["$PORT"]
ENTRYPOINT ["node", "server.js"]

