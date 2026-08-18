from celery import shared_task
from django.core.management import call_command

@shared_task
def scrape_telegram_task():
    call_command('scrape_telegram', days=2)