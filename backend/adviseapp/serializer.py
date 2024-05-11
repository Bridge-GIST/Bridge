# AdviceApp/serializers.py
from rest_framework import serializers
from .models import Advice

class AdviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Advice
        fields = ['id', 'target_diary', 'gpt_advice']
