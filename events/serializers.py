from rest_framework import serializers
from .models import *
class OrganizerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organizer
        fields = ['organization_name', 'bio']
        
class EventSerializer(serializers.ModelSerializer):
    organizer = serializers.CharField(write_only=True)
    attendee_count = serializers.ReadOnlyField()
    is_full = serializers.ReadOnlyField()

    class Meta:
        model = Event
        fields = '__all__'
        read_only_fields = ['organizer']

class RSVPSerializer(serializers.ModelSerializer):
    class Meta:
        model = RSVP
        fields = '__all__'
        read_only_fields = ['user']
