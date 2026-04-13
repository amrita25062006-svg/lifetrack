from rest_framework.routers import DefaultRouter
from .views import UserViewSet, DailyHealthLogViewSet, HealthGoalViewSet, AlertViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'logs', DailyHealthLogViewSet)
router.register(r'goals', HealthGoalViewSet)
router.register(r'alerts', AlertViewSet)

urlpatterns = router.urls