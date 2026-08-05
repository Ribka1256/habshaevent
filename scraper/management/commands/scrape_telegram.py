# scraper/management/commands/scrape_telegram.py
from django.core.management.base import BaseCommand
from telethon.sync import TelegramClient
from events.models import Event
from accounts.models import User
import re
from datetime import datetime
from dateutil import parser as date_parser
from dateutil.parser import ParserError
from datetime import timedelta


API_ID = '34122130'
API_HASH = 'b65d38bda48ee41f381286ae82d2c2dc'
CHANNELS = ['@EventsEthiopia','@EventInAddis','@LinkUpAddis']

class Command(BaseCommand):
    help = 'Scrape events from Telegram channels'
    def handle(self, *args, **options):
        self.stdout.write('Starting scraper...')
        with TelegramClient('scraper_session', API_ID, API_HASH) as client:
            self.stdout.write('Connected to Telegram.')
            bot_user, _ = User.objects.get_or_create(
                username='telegram_bot', defaults={'is_organizer': True}
            )
            self.stdout.write(f'Bot user ready: {bot_user}')

            for channel in CHANNELS:
                self.stdout.write(f'Checking channel: {channel}')
                message_count = 0
                for message in client.iter_messages(channel, limit=50):
                    message_count += 1
                    if not message.text:
                        continue

                    title = self.extract_title(message.text)
                    location = self.extract_location(message.text)
                    date = self.extract_date(message.text)

                    self.stdout.write(f'--- Message text: {message.text[:80]}...')
                    self.stdout.write(f'    Extracted -> title={title}, date={date}, location={location}')

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
                                'end_datetime': date + timedelta(hours=3),
                                'source': 'telegram',
                                'source_channel': channel,
                            }
                        )
                        self.stdout.write(f'Saved: {title} (from {channel})')
                    else:
                        self.stdout.write(f'Skipped (missing title or date)')

                self.stdout.write(f'Total messages checked in {channel}: {message_count}')

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
        date_str = match.group(1).strip()

        # Clean up common noise that trips up the parser
        date_str = date_str.replace('local time', '').strip()
        date_str = re.sub(r'(\d+)(st|nd|rd|th)', r'\1', date_str)  # "31st" -> "31"
        date_str = re.sub(r'^Deadline:\s*', '', date_str, flags=re.IGNORECASE)
        date_str = re.sub(r'^Application Deadline:\s*', '', date_str, flags=re.IGNORECASE)
        date_str = re.sub(r'^Till\s+', '', date_str, flags=re.IGNORECASE)

        try:
            return date_parser.parse(date_str, fuzzy=True)
        except (ParserError, ValueError):
            return None