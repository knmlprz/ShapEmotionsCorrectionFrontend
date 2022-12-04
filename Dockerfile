FROM node:19-alpine as builder
LABEL MAINTAINER="Patryk Gronkiewicz <164157@stud.prz.edu.pl>"
WORKDIR /src
COPY . /src
RUN npm install && npx parcel build src/index.html

FROM nginx
COPY --from=builder /src/dist/* /usr/share/nginx/html
