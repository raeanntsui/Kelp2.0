FROM node:15-alpine3.10 as build
COPY /react-app /react_app
WORKDIR /react_app
RUN npm install && CI=false && npm run build
FROM python:3.9.18-alpine3.18
RUN apk add build-base
RUN apk add postgresql-dev gcc python3-dev musl-dev
ARG FLASK_APP
ARG FLASK_ENV
ARG DATABASE_URL
ARG SCHEMA
ARG REACT_APP_BASE_URL
ARG SECRET_KEY
WORKDIR /var/www
COPY requirements.txt .
RUN pip install -r requirements.txt
RUN pip install psycopg2
COPY . .
COPY --from=build /react_app /var/www/react-app
RUN flask db upgrade
RUN flask seed all
CMD gunicorn app:app
