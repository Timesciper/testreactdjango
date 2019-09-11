from django.db import models

# Create your models here.


class Lead (models.Model):
    name = models.CharField(max_length=100)
    message = models.CharField(max_length=500, blank=True)
    comment = models.CharField(max_length=100, blank=True)
    email = models.EmailField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
