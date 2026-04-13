from rest_framework import viewsets
from .models import Users, DailyHealthLogs, HealthGoals, Alerts
from .serializers import UserSerializer, DailyHealthLogSerializer, HealthGoalSerializer, AlertSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserSerializer

class DailyHealthLogViewSet(viewsets.ModelViewSet):
    queryset = DailyHealthLogs.objects.all()
    serializer_class = DailyHealthLogSerializer

class HealthGoalViewSet(viewsets.ModelViewSet):
    queryset = HealthGoals.objects.all()
    serializer_class = HealthGoalSerializer

class AlertViewSet(viewsets.ModelViewSet):
    queryset = Alerts.objects.all()
    serializer_class = AlertSerializer