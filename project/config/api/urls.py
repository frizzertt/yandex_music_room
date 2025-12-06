from django.urls import re_path
from .views import RoomView, CreateRoomView, GetRoom, JoinRoom

urlpatterns = [
    re_path(r'^room/?$', RoomView.as_view()),
    re_path(r'^create-room/?$', CreateRoomView.as_view()),
    re_path(r'^get-room/?$', GetRoom.as_view()),
    re_path(r'^join-room/?$', JoinRoom.as_view()),
]
