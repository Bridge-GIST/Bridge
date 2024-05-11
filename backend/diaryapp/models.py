from django.db import models

class DiaryApp(models.Model):
    #id = models.AutoField(primary_key=True)
    writer = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=45)
    content = models.TextField(max_length=3000)
    gpt_content = models.TextField(max_length=3000)
    weather = models.IntegerField(default=0)
    sleep_hour = models.FloatField(max_length=3000)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
