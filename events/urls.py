from django.urls import path
from . import views
from .views import EventViewSet, RSVPViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('events',EventViewSet,basename='event')
router.register('rsvps',RSVPViewSet,basename='rsvp')
urlpatterns = router.urls