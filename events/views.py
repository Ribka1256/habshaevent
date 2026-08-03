from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import generics, permissions,viewsets
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
# Create your views here.
class IsOrganizerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        if obj.organizer.is_staff:
            return request.user.is_staff
        return obj.organizer == request.user
    
    
        
class EventViewSet(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOrganizerOrReadOnly]

    def get_queryset(self):
        qs = Event.objects.all()
        if self.action == 'list':
            qs = qs.filter(status='published')
        return qs

    def perform_create(self, serializer):
        serializer.save(organizer=self.request.user)

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def my_events(self, request):
        events = Event.objects.filter(organizer=request.user)
        serializer = self.get_serializer(events, many=True)
        return Response(serializer.data)
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def featured(self, requset):
        events= Event.objects.filter(status='published', is_featured=True)
        serializer = self.get_serializer(events, many=True)
        return Response(serializer.data)

    def logout(self, request):
        logout(request)
        return Response({"message": "Logged out successfully."})


class RSVPViewSet(viewsets.ModelViewSet):
    query = RSVP.objects.all()
    serializer = RSVPSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)