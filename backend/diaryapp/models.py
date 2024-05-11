from django.db import models
from django.contrib.auth import get_user_model

User=get_user_model()
class DiaryApp(models.Model):
    writer = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=45)
    content = models.TextField(max_length=3000)
    gpt_content = models.TextField(max_length=3000)
    weather = models.IntegerField(default=0)
    sleep_hour = models.FloatField(max_length=3000)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
