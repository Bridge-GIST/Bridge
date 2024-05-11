from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Recommend
from .serializers import RecommendSerializer
from diaryapp.models import DiaryApp

"""
class PostAPI(APIView):
    def generate_recommend(self): # content 생성 method
        pass
    def post(self, request, *args, **kwargs):
        serializer = RecommendSerializer(data=request.data) 
        if serializer.is_valid():
            recommend = Recommend.objects.first()
            if recommend==None:
                recommend = Recommend.objects.create()
                recommend.target_diary = serializer['target_diary']
            try:
                diary = DiaryApp.objects.get(id=recommend.target_diary)
                config = diary.content
                recommend.content = self.generate_recommend(config)
                recommend.save()
            except DiaryApp.DoesNotExist:
                return Response({'error': 'Diary not found'}, status=status.HTTP_400_BAD_REQUEST)
            return Response({'Recommend': recommend.content})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetAPI(APIView):
    def generate_recommend(self):
        pass
    def get(self, request, *args, **kwargs):
        serializer = RecommendSerializer(data=request.data)
        if serializer.is_valid(): 
            if(Recommend.objects.count() == 0):
                return Response({'error':'Recommend not found'}, status=status.HTTP_400_BAD_REQUEST)
            recommend = Recommend.objects.first()
            if recommend.target_diary == serializer['target_diary']:
                return Response({'Recommend': recommend.content})
            else:
                return Response({'error':'Recommend not found'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)        
"""

class PostRecommendAPI(APIView):
    def generate_recommend(self): # content 생성 method
        return 'diary test'

    def post(self, request, *args, **kwargs):
        serializer = RecommendSerializer(data=request.data) 
        if serializer.is_valid():
            recommend = Recommend.objects.first()
            if recommend==None:
                recommend = Recommend.objects.create()
                recommend.target_diary = serializer.validated_data['target_diary']
            try:
                diary = DiaryApp.objects.get(id=recommend.target_diary)
                config = diary.content
                recommend.content = self.generate_recommend(config)
                print(recommend.content)
                recommend.save()
            except DiaryApp.DoesNotExist:
                return Response({'error': 'Diary not found'}, status=status.HTTP_400_BAD_REQUEST)
            return Response({'Recommend': recommend.content})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetRecommendAPI(APIView):
    def get(self, request, *args, **kwargs):
        serializer = RecommendSerializer(data=request.data)
        if serializer.is_valid(): 
            if(Recommend.objects.count() == 0):
                return Response({'error':'Recommend not found'}, status=status.HTTP_400_BAD_REQUEST)
            recommend = Recommend.objects.first()
            if recommend.target_diary == serializer.validated_data['target_diary']:
                return Response({'Recommend': recommend.content})
            else:
                return Response({'error':'Recommend not found'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)        
