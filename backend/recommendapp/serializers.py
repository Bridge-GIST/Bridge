from rest_framework import serializers
from .models import Recommend

class RecommendSerializer(serializers.Serializer):
    #recommend = serializers.CharField(max_length=10)

    class Meta:
        model = Recommend
        fields = ['target_diary']