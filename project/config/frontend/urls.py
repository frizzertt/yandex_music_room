from django.urls import path, re_path
from .views import index

urlpatterns = [
    path('', index),
    re_path(r'^join/?$', index),
    re_path(r'^create/?$', index),
    path('room/<str:roomCode>', index),
]