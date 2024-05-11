from django.shortcuts import render

# Create your views here.
# AdviceApp/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Advice
from .serializer import Serializer

class PostAdviceAPI(APIView):
  def post(self, request, *args, **kwargs):
    serializer = Serializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetAdviceAPI(APIView):
  def get(self, request, pk, *args, **kwargs):
    try:
      advice = Advice.objects.get(pk=pk)
      serializer = Serializer(advice)
      return Response(serializer.data)
    except Advice.DoesNotExist:
      return Response({'error': 'Advice not found'}, status=status.HTTP_404_NOT_FOUND)


"""
class PostRecommendationAPI(APIView):
  def post(self, request, *args, **kwargs):
    serializer = Serializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class GetRecommendationAPI(APIView):
  def get(self, request, pk, *args, **kwargs):
    try:
      recommendation = Advice.objects.get(pk=pk)
      serializer = Serializer(recommendation)
      return Response(serializer.data)
    except Advice.DoesNotExist:
      return Response({'error': 'Advice not found'}, status=status.HTTP_404_NOT_FOUND)
"""
