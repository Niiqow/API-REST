FROM nginx:latest

RUN apt-get update && apt-get install -y nodejs npm postgresql postgresql-contrib

# Crear un usuario y una contraseña de PostgreSQL
ENV POSTGRES_USER myuser
ENV POSTGRES_PASSWORD 123

USER postgres
RUN /etc/init.d/postgresql start &&\
    psql --command "CREATE DATABASE my-app;" &&\
    psql --command "CREATE USER $POSTGRES_USER WITH ENCRYPTED PASSWORD '$POSTGRES_PASSWORD';" &&\
    psql --command "GRANT ALL PRIVILEGES ON DATABASE my-app TO $POSTGRES_USER;" &&\
    psql --command "CREATE TABLE task ( id SERIAL PRIMARY KEY, nota TEXT, estado INTEGER DEFAULT 0);" &&\
    psql --command "INSERT INTO task (nota) VALUES ('Tarea 1');" &&\
    psql --command "INSERT INTO task (nota) VALUES ('Tarea 2');" &&\
    psql --command "INSERT INTO task (nota) VALUES ('Tarea 3');" &&\
    psql --command "INSERT INTO task (nota) VALUES ('Tarea 4');" &&\
    psql --command "INSERT INTO task (nota) VALUES ('Tarea 5');"

WORKDIR /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY . .

RUN npm install
CMD node index.js


EXPOSE 8080
CMD [ "node", "index.js" ]
