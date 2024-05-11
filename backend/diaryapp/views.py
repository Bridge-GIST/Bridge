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
    
#일기의 제목,내용,수면시간을 한 문장으로 합쳐서 gpt한테 보내는..?
class CreateDiaryAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # 요청에서 데이터 가져오기
        title = request.data.get('title')
        content = request.data.get('content')
        sleep_hour = request.data.get('sleep_hour')
        writer = request.user

        # 모든 정보를 함께 저장
        diary = DiaryApp.objects.create(title=title, content=content, sleep_hour=sleep_hour, writer=writer)
        
        # 직렬화하고 응답 반환
        serializer = DiarySerializer(diary)
        return Response(serializer.data)
    
#제목이나 날짜 정보를 받아서 반환
class SearchDiaryAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        query = request.GET.get('query', '')  # 검색어
        date = request.GET.get('date', '')    # 날짜 정보

        # 제목 또는 날짜 정보를 포함하는 일기를 필터링
        diaries = DiaryApp.objects.filter(title__icontains=query) | DiaryApp.objects.filter(created_at__date=date)

        serializer = DiarySerializer(diaries, many=True)
        return Response(serializer.data)


"""
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
"""

