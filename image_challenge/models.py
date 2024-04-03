from django.db import models

class Image(models.Model):
    """
    Model representing an uploaded image.
    """
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='images/')

    def __str__(self):
        return self.name

class Comment(models.Model):
    """
    Model representing a comment on an image.
    """
    image = models.ForeignKey(Image, on_delete=models.CASCADE, related_name='comments')
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Comment on {self.image.name}'
