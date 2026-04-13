from django.contrib import admin
from .models import Users, DailyHealthLogs

admin.site.register(Users)
admin.site.register(DailyHealthLogs)