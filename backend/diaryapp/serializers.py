from rest_framework import serializers
from .models import DiaryApp

class DiarySerializer(serializers.ModelSerializer) :
    class Meta :
        model = DiaryApp        # product 모델 사용
        fields = ['id', 'writer', 'title', 'content','analysis','gpt_content', 'created_at'] 