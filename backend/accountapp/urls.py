from django.urls import path
from .views import AccountCreateAPI, LoginAPI, LogoutAPI

app_name = 'accountapp'

urlpatterns = [
    path('signup/', AccountCreateAPI.as_view(), name='signup'),
    path('login/', LoginAPI.as_view(), name='login'),
    path('logout/', LoginAPI.as_view(), name='logout')
]