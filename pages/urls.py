from django.urls import path

from .views import HomePageView, CodePageView

urlpatterns = [
    path("", HomePageView.as_view(), name="home"),
    path("code", CodePageView.as_view(), name="code"),
]
