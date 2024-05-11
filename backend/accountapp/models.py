from django.db import models

class Vote(models.Model):
    biden_count= models.IntegerField(default=0)
    trump_count= models.IntegerField(default=0)
