# AdviceApp/urls.py
from django.urls import path
from .views import PostAdviceAPI, GetAdviceAPI

app_name = 'adviceapp'

urlpatterns = [
  path('post-advice', PostAdviceAPI.as_view(), name='post-advice'),
  path('get-advice/<int:pk>', GetAdviceAPI.as_view(), name='get-advice'),
  #path('post-recommendation', PostRecommendationAPI.as_view(), name='post-recommendation'),
  #path('get-recommendation', GetRecommendationAPI.as_view(), name='get-recommendation'),
]
