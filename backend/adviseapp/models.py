from django.db import models

# Create your models here.
# AdviceApp/models.py
from diaryapp.models import DiaryApp  # Assuming you have another app named TargetDiaryApp

class Advice(models.Model):
    target_diary = models.ForeignKey(DiaryApp, on_delete=models.CASCADE)
    gpt_advice = models.TextField(max_length=3000)
    #gpt_recommendation = models.TextField(max_length=3000) 

    def __str__(self):
        return f"Advice for {self.target_diary}"

"""
from django.db import models
from diaryapp.models import DiaryApp as Diary

# Create your models here.
class Recommend(models.Model):
    target_diary = models.OneToOneField(Diary,related_name='recommend',on_delete= models.CASCADE) # target diary의 id
    content = models.TextField(default=None) # return해줘야 할 recommend의 content
        

"""