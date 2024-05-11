from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from accountapp.models import User
from .serializers import AccountCreateSerializer
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from django.contrib.auth import authenticate, login, logout
from rest_framework import permissions


class AccountCreateAPI(APIView):
    def post(self, request):
        serializer = AccountCreateSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.is_active = False
            user.save()

            return Response({'message': '회원가입성공'}, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    
# 로그인
class LoginAPI(APIView):
    #@csrf_exempt # 배포시 해결할것
    def post(self, request, format=None):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            #token, created = Token.objects.get_or_create(user=user)
            return Response({"message": "로그인 성공"}, status=status.HTTP_200_OK)
            #return Response({"token": token.key}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "아이디/패스워드를 확인하세요."}, status=status.HTTP_400_BAD_REQUEST)
        

class LogoutAPI(APIView):
    permission_classes = [permissions.IsAuthenticated] 
    def post(self, request):
        logout(request) 
        return Response({"message": "로그아웃 되었습니다."}, status=status.HTTP_200_OK)