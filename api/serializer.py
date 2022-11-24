from rest_framework import serializers

from accounts.models import CustomUser
from api.models import Copilot


class CopilotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Copilot
        fields = '__all__'
