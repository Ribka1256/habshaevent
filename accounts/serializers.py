from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()
class RegisterSerializer(serializers.ModelField):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'is_organizer']

class UserSerializer(serializers.ModelField):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_organizer']
