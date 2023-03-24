FROM nginx:latest

RUN apt-get update && apt-get install -y nodejs npm postgresql postgresql-contrib

USER postgres
RUN /etc/init.d/postgresql start &&\
    psql --command "CREATE USER myuser WITH SUPERUSER PASSWORD 'mypassword';" &&\
    createdb -O myuser mydb

WORKDIR /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY . .

RUN npm install
CMD node index.js


EXPOSE 8080
CMD [ "node", "index.js" ]
