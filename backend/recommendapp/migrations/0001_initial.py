# Generated by Django 4.2.13 on 2024-05-11 14:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('diaryapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Recommend',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField(default=' ', null=True)),
                ('target_diary', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='recommend', to='diaryapp.diaryapp')),
            ],
        ),
    ]
