from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, username, email=None, password=None, school=None):
        if not username:
            raise ValueError('must have username')
        user=self.model(
            username=username,
            is_active=True
        )
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, username, password):
        superuser=self.create_user(
            username=username,
            password=password,
        )
        superuser.is_admin=True
        superuser.is_superuser=True
        superuser.is_staff=True
        superuser.is_active = True
        superuser.save()
        return superuser
    
class User(AbstractBaseUser):
    username_pattern = RegexValidator(r'^[0-9a-zA-Z_]{5,20}$', '5-20글자 사이의 숫자,영문,언더바만 가능합니다!')
    objects = UserManager()

    username = models.CharField(max_length=20, null=False,
                                unique=True, validators=[username_pattern])
    is_active = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'username'

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return self.is_admin