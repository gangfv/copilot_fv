#!/usr/bin/env sh

python manage.py migrate --noinput

python manage.py collectstatic --noinput

gunicorn django_project.wsgi:application --bind 0.0.0.0:8000 --reload -w 4
