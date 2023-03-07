FROM nginx:latest

RUN apt-get update && apt-get install -y nodejs npm

WORKDIR /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY . .

RUN npm install
CMD node index.js


EXPOSE 3000
