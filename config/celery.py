import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'habashaevent.settings')
app = Celery('habashaevent')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()