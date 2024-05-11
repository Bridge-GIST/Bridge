from django.db import models
from diaryapp.models import DiaryApp

# Create your models here.
class Recommend(models.Model):
    target_diary = models.OneToOneField(DiaryApp,related_name='recommend',on_delete= models.CASCADE) # target diary의 id
    content = models.TextField(default=' ', null=True) # return해줘야 할 recommend의 content
  