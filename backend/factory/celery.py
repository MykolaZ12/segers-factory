from __future__ import absolute_import

import os

import django
from celery import Celery
from django.conf import settings

app = Celery('factory')

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'factory.settings')
django.setup()
app.config_from_object(settings)
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

