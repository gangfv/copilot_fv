from django.urls import path

from .views import *

urlpatterns = [
    path('copilot/', CopilotAPIList.as_view()),
    path('copilot/<int:pk>/', CopilotAPIUpdateDestroy.as_view()),
]
