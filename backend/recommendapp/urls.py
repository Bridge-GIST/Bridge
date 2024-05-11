from django.urls import path
from .views import PostRecommendAPI, GetRecommendAPI

app_name = 'recommendapp'

urlpatterns = [
    path('post-recommend', PostRecommendAPI.as_view(), name='post-recommend'),
    path('get-recommend', GetRecommendAPI.as_view(), name='get-recommend'),
]