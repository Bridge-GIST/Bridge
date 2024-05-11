from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import DiaryApp
from .serializers import DiarySerializer

from langchain.chat_models import ChatOpenAI
from langchain.prompts.chat import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
)
from langchain.chains import LLMChain
import os
import center.settings

from decouple import config

# Load OPENAI_API_KEY from environment variables
OPENAI_API_KEY = config('OPENAI_API_KEY')
os.environ["OPENAI_API_KEY"] = OPENAI_API_KEY

def diary_generator(diary):
    chat = ChatOpenAI(temperature=0)

    template = '''
    당신은 일기 수정 전문 인공지능입니다.
    당신의 주된 임무는 일기에서 부정적인 감정이나 상황을 확인하고, 이를 긍정적인 관점으로 재해석한 후 일기의 부정적인 내용을 긍정적인 내용으로 수정하는 것입니다.
    만약 다른 사람이 수정된 일기를 읽는다면 그들은 일기를 쓴 사람이 기분 좋은 하루를 보냈고 밝은 에너지를 가졌다는 것을 반드시 느껴야합니다.
    또한 일기를 입력받으면 문장의 문체를 분석하여 '-ㅂ니다'와 같은 하십시오체를 사용했는지 '-다'와 같은 해라체를 사용했는지 '-아요,-어요'와 같은 해요체를 사용했는지 확인합니다.
    모든 출력 문장은 입력된 일기의 문체를 반드시 유지합니다. 예를 들어, 입력 문장이 하십시오체라면 하십시오체를, 해라체라면 해라체를, 해요체라면 해요체를 사용합니다.
    다시 한 번 강조합니다. 당신의 주된 임무는 일기가 긍정적인 내용으로 수정함과 동시에 원작자의 문체를 유지하는 것입니다.
    모든 응답은 반드시 일기형식으로 작성합니다. 즉, 고칠것이 없는 일기라도 일기 형식의 글을 돌려주어야 합니다.
    '''

    system_message_prompt = SystemMessagePromptTemplate.from_template(template)
    human_template="{text}"
    human_message_prompt = HumanMessagePromptTemplate.from_template(human_template)

    chat_prompt = ChatPromptTemplate.from_messages([system_message_prompt, human_message_prompt])
    chatchain = LLMChain(llm=chat, prompt=chat_prompt)
    result = chatchain.run(text=diary)
    return result

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
        gpt_content = diary_generator(content)

        # 모든 정보를 함께 저장
        diary = DiaryApp.objects.create(title=title, content=content, sleep_hour=sleep_hour, writer=writer, gpt_content=gpt_content)
        
        # 직렬화하고 응답 반환
        serializer = DiarySerializer(diary)
        return Response(serializer.data)
    
     # GPT로 긍정 일기 변환 (임시 처리)
        diary.positive_content = self.transform_content_using_gpt(content)
        diary.save()

        serializer = DiarySerializer(diary)
        return Response(serializer.data)

    def transform_content_using_gpt(self, content):
        # GPT 모델을 사용하여 내용을 긍정적으로 변환
        return f"긍정적인 변환 예시: {content}"  # 임시 구현
    
    
    
    
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

