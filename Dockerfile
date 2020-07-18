FROM node:12

COPY . .

ENV NODE_ENV base

ENV POSTGRES_HOST postgres

ENV POSTGRES_USER postgres

ENV POSTGRES_PWD mysecretpassword

ENV POSTGRES_DB testapi

ENV POSTGRES_PORT 5432

RUN ["npm", "install"]

EXPOSE 3000