# Generated by Django 4.2.13 on 2024-05-11 19:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('diaryapp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='diaryapp',
            name='analysis',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='diaryapp',
            name='gpt_content',
            field=models.TextField(blank=True),
        ),
    ]
