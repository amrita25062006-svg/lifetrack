from django.db import models

class Users(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    gender = models.CharField(max_length=10)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)

    def __str__(self):
        return self.name


class DailyHealthLogs(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    sleep_hours = models.FloatField()
    water_intake = models.FloatField()
    exercise_minutes = models.IntegerField()
    screen_time_hours = models.FloatField()
    stress_level = models.IntegerField()

    def __str__(self):
        return f"{self.user.name} - {self.date}"


class HealthGoals(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    sleep_goal = models.FloatField()
    water_goal = models.FloatField()
    exercise_goal = models.IntegerField()
    screen_time_limit = models.FloatField()


class Alerts(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    alert_type = models.CharField(max_length=100)
    alert_message = models.TextField()
    alert_date = models.DateField(auto_now_add=True)