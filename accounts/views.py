from django.shortcuts import render
from rest_framework import generics, permissions
from .serializers import RegisterSerializer
# Create your views here.

class RegisterView(generics.CreateAPIView):
    serializer = RegisterSerializer
    permission_classes = [permissions.AllowAny]