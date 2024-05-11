from rest_framework import serializers
from .models import Vote

class VoteSerializer(serializers.Serializer):
    vote = serializers.CharField(max_length=10)

    class Meta:
        model = Vote
        fields = ['biden_count', 'trump_count', 'vote']