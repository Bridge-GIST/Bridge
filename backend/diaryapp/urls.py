from django.urls import path
from .views import UserDiaryListAPIView, CreateDiaryAPIView, SearchDiaryAPIView

app_name = 'bridge'

urlpatterns = [
    path('user-diaries', UserDiaryListAPIView.as_view(), name='user_diaries'),
    path('create-diary', CreateDiaryAPIView.as_view(), name='create_diary'),
    path('search-diary', SearchDiaryAPIView.as_view(), name='search_diary'),
]
