from django.urls import path
from .views import UserDiaryListAPIView, CreateDiaryTitleAPIView, CreateDiaryContentAPIView, CreateSleepHourAPIView

urlpatterns = [
    path('user-diaries', UserDiaryListAPIView.as_view(), name='user_diaries'),
    path('create-diary-title', CreateDiaryTitleAPIView.as_view(), name='create_diary_title'),
    path('create-diary-content/<int:pk>', CreateDiaryContentAPIView.as_view(), name='create_diary_content'),
    path('create-sleep-hour/<int:pk>', CreateSleepHourAPIView.as_view(), name='create_sleep_hour'),
]
