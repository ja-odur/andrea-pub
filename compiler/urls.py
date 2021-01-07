from django.urls import path, re_path
from django.views.generic.base import TemplateView
from . import views

urlpatterns = [
    path('api/code/', views.compile_code),
]
