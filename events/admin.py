from django.contrib import admin
from .models import Organizer,Event,RSVP
# Register your models here.
@admin.register(Organizer)
class OrganizerAdmin(admin.ModelAdmin):
    list_display = ('organization_name', 'bio')
    search_fields = ('organization_name',)
    autocomplete_fields = ('user',)
@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'organizer', 'category', 'start_datetime', 'end_datetime', 'capacity', 'status', 'is_featured')
    list_filter = ('status', 'category', 'is_featured')
    search_fields = ('title', 'description', 'location')
    autocomplete_fields = ('organizer',)
admin.site.register(RSVP)