from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Vote
from .serializers import VoteSerializer

class PostAPI(APIView):
    def post(self, request, *args, **kwargs):
        serializer = VoteSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid(): 
            vote = Vote.objects.first()
            if vote is None:
                vote = Vote.objects.create(biden_count=0, trump_count=0)   
            if serializer.validated_data['vote'] == 'Biden':
                vote.biden_count += 1
            elif serializer.validated_data['vote'] == 'Trump':
                vote.trump_count += 1
            else:
                return Response({'error': 'Invalid vote option'}, status=status.HTTP_400_BAD_REQUEST)

            vote.save()
            return Response({'biden_count': vote.biden_count, 'trump_count': vote.trump_count}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetAPI(APIView):
    def get(self, request, *args, **kwargs):
        if(Vote.objects.count() == 0):
            vote = Vote(biden_count=0, trump_count=0)
            vote.save()
        vote = Vote.objects.first()
        return Response({'biden_count': vote.biden_count, 'trump_count': vote.trump_count})

