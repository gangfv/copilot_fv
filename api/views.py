from rest_framework import generics

from api.models import Copilot
from api.serializer import CopilotSerializer


class CopilotAPIList(generics.ListCreateAPIView):
    queryset = Copilot.objects.all()
    serializer_class = CopilotSerializer


class CopilotAPIUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Copilot.objects.all()
    serializer_class = CopilotSerializer