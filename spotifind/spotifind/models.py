from django.db import models


class Song(models.Model):
    docid = models.IntegerField(primary_key=True, auto_created=False)
    title = models.CharField(max_length=500)
    artist = models.CharField(max_length=500)
    lyrics = models.TextField()
    url_img = models.URLField(max_length=500)
    url_spotify = models.URLField(max_length=500, null=True)

    def __str__(self):
        return self.title
