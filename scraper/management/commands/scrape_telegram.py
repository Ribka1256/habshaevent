# scraper/management/commands/scrape_telegram.py
from django.core.management.base import BaseCommand
from telethon.sync import TelegramClient
from events.models import Event
from accounts.models import User
import re
from datetime import datetime

API_ID = '34122130'
API_HASH = 'b65d38bda48ee41f381286ae82d2c2dc'
CHANNELS = ['@EventsEthiopia','@EventInAddis','@LinkUpAddis']

class Command(BaseCommand):
    help = 'Scrape events from Telegram channels'

    def handle(self, *args, **options):
        with TelegramClient('scraper_session', API_ID, API_HASH) as client:
            bot_user, _ = User.objects.get_or_create(
                username='telegram_bot', defaults={'is_organizer': True}
            )

            for channel in CHANNELS:
                for message in client.iter_messages(channel, limit = 50):
                    if  not message.text:
                        continue
                    title = self.extract_title(message.text)
                    location = self.extract_location(message.text)
                    date = self.extract_date(message.text)

                    if title and date:
                        Event.objects.get_or_create(
                            title=title,
                            start_datetime=date,
                            defaults={
                                'organizer': bot_user,
                                'description': message.text,
                                'location': location or 'Unknown',
                                'status': 'published',
                                'is_featured': False,
                            }
                        )
                        self.stdout.write(f'Successfully scraped event: {title}')

    def extract_title(self, text):
        # first non-empty line, stripped of emoji, as a simple heuristic
        lines = [l.strip() for l in text.split('\n') if l.strip()]
        return lines[0][:200] if lines else None

    def extract_location(self, text):
        match = re.search(r'📍\s*(.+)', text)
        return match.group(1).strip() if match else None

    def extract_date(self, text):
        match = re.search(r'📅\s*(.+)', text)
        if not match:
            return None
        try:
            return datetime.strptime(match.group(1).strip(), '%b %d, %Y')
        except ValueError:
            return None