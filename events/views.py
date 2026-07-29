from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import generics, permissions,viewsets
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.response import Response
# Create your views here.
class IsOrganizerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return (
            hasattr(request.user, 'organizer_profile')
            and obj.organizer == request.user.organizer_profile
        )

class EventViewSet(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOrganizerOrReadOnly]

    def get_queryset(self):
        qs = Event.objects.all()
        if self.action == 'list':
            qs = qs.filter(status='published')
        return qs
    
    def perform_create(self, serializer):
        organizer = self.request.user.organizer_profile
        serializer.save(organizer=organizer)

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def my_events(self, request):
        organizer = request.user.organizer_profile
        events = Event.objects.filter(organizer=organizer)
        serializer = self.get_serializer(events, many=True)
        return Response(serializer.data)

class RSVPViewSet(viewsets.ModelViewSet):
    query = RSVP.objects.all()
    serializer = RSVPSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)