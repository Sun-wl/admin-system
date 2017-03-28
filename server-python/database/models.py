from django.db import models
from django.utils import timezone

class News(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField(blank=True)
    create_time = models.DateTimeField(default=timezone.now)