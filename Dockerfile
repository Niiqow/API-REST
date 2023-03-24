FROM nginx:latest

RUN apt-get update && apt-get install -y nodejs npm postgresql postgresql-contrib

# Crear un usuario y una contraseña de PostgreSQL
ENV POSTGRES_USER myuser
ENV POSTGRES_PASSWORD 123

USER postgres
RUN /etc/init.d/postgresql start &&\
    psql --command "CREATE USER myuser WITH SUPERUSER PASSWORD '123';" &&\
    createdb -O myuser my-app &&\
    psql -d my-app -c "CREATE TABLE task (id SERIAL PRIMARY KEY, nota TEXT, estado INTEGER DEFAULT 0);" &&\
    psql -d my-app -c "INSERT INTO task (nota) VALUES ('Tarea 1');"
WORKDIR /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY . .


CMD node index.js


EXPOSE 8080
CMD [ "node", "index.js" ]
