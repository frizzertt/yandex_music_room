from django.urls import re_path
from .views import RoomView

urlpatterns = [
    re_path(r'^room/?$', RoomView.as_view()),
]
