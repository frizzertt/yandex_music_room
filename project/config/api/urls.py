from django.urls import re_path
from .views import RoomView, CreateRoomView

urlpatterns = [
    re_path(r'^room/?$', RoomView.as_view()),
    re_path(r'^create-room/?$', CreateRoomView.as_view())
]
