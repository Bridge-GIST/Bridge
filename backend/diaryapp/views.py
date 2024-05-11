from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import DiaryApp
from .serializers import DiarySerializer

#인증된 사용자가 작성한 모든 일기를 가져오는 기능을 처리
class UserDiaryListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        diaries = DiaryApp.objects.filter(writer=request.user)
        serializer = DiarySerializer(diaries, many=True)
        return Response(serializer.data)
#인증된 사용자가 일기 제목을 작성하는 기능
class CreateDiaryTitleAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        title = request.data.get('title')
        writer = request.user
        diary = DiaryApp.objects.create(title=title, writer=writer)
        serializer = DiarySerializer(diary)
        return Response(serializer.data)
#인증된 사용자가 일기 내용을 작성하는 기능
class CreateDiaryContentAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        diary = get_object_or_404(DiaryApp, pk=pk)
        content = request.data.get('content')
        diary.content = content
        diary.save()
        serializer = DiarySerializer(diary)
        return Response(serializer.data)
#인증된 사용자가 수면 시간을 기록하는 기능
class CreateSleepHourAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        diary = get_object_or_404(DiaryApp, pk=pk)
        sleep_hour = request.data.get('sleep_hour')
        diary.sleep_hour = sleep_hour
        diary.save()
        serializer = DiarySerializer(diary)
        return Response(serializer.data)

