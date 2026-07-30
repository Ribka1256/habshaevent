from rest_framework import serializers

from .models import User


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)  # ✅ correct — hashes password
        return user

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'is_organizer']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_organizer']
