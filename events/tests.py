from django.test import TestCase
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from .models import Event
from datetime import datetime, timedelta

User = get_user_model()

class EventPermissionTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.owner = User.objects.create_user(username='owner', password='pass123')
        self.other = User.objects.create_user(username='other', password='pass123')
        self.event = Event.objects.create(
            organizer = self.owner,
            title='Test Event',
            location='Addis Ababa',
            start_datetime=datetime.now() + timedelta(days=1),
            end_datetime=datetime.now() + timedelta(days=1, hours=3),
        )

    def test_owner_can_edit_own_event(self):
        self.client.force_authenticate(user=self.owner)
        response = self.client.patch(f'/api/events/{self.event.id}/', {'title': 'Updated'})
        self.assertEqual(response.status_code, 200)

    def test_other_user_cannot_edit_event(self):
        self.client.force_authenticate(user=self.other)
        response = self.client.patch(f'/api/events/{self.event.id}/', {'title': 'Hacked'})
        self.assertEqual(response.status_code, 403)

    def test_anonymous_cannot_create_event(self):
        response = self.client.post('/api/events/', {'title': 'New'})
        self.assertEqual(response.status_code, 401)