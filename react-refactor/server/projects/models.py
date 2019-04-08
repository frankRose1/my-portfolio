from django.db import models

# Create your models here.


class Project(models.Model):
    title = models.CharField(max_length=250, blank=False)
    description = models.TextField(blank=False)
    demo_link = models.URLField()
    github_link = models.URLField()
    tags = models.CharField(max_length=300)
    date_added = models.DateTimeField(auto_now_add=True)
    image_url = models.URLField(blank=False)
