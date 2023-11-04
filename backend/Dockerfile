#Operációs rendszer Alpine linux
#node
#code
#parancsok npm start
#open port


FROM node:20-alpine3.16

ADD . ./app
WORKDIR /app
RUN  [ "npm", "install" ]
CMD [ "npm", "run", "server" ]

EXPOSE 8080


# docker build . -t mybackend
# docker run -p 8080:8080 mybackend

# docker ps
# docker stop "id"

# docker tag mybackend petergyenge/mybackend:0.0.1
# docker push  petergyenge/mybackend:0.0.1

