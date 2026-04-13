from rest_framework import serializers
from .models import Users, DailyHealthLogs, HealthGoals, Alerts

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'

class DailyHealthLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyHealthLogs
        fields = '__all__'

class HealthGoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthGoals
        fields = '__all__'

class AlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alerts
        fields = '__all__'