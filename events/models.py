from django.db import models
from django.conf import settings
from django.contrib.auth import decorators



# Create your models here.
class Organizer(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='organizer_profile')
    organization_name = models.CharField(max_length=255)
    bio = models.TextField(blank=True)
    phone_number = models.CharField(max_length=255)
    is_verified = models.BooleanField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Event(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed'),
    ]
    organizer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='events')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True,  related_name='events')
    location  = models.CharField(max_length=255)
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    capacity = models.PositiveIntegerField(default=0)
    cover_image = models.ImageField(upload_to='event_covers/', blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')                      
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_featured = models.BooleanField(default=False)
    source = models.CharField(max_length=50, default='manual')  # 'manual' or 'telegram'
    source_channel = models.CharField(max_length=100, blank=True)

    class Meta:
        ordering = ['-start_datetime']

    def __str__(self):
        return self.title

    @property
    def attendee_count(self):
        return self.rsvps.filter(status='confirmed').count()

    @property
    def is_full(self):
        return self.capacity > 0 and self.attendee_count >= self.capacity

class RSVP(models.Model):
    STATUS_CHOICES = [
        ('confirmed', 'Confirmed'),
        ('waitlisted', 'Waitlisted'),
        ('cancelled', 'Cancelled'),
    ]
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='rsvps')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='rsvps')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='confirmed')
    guest_count = models.PositiveIntegerField(default=0)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('event', 'user')