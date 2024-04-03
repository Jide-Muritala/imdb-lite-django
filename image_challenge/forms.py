from django import forms
from .models import Image

class ImageUploadForm(forms.ModelForm):
    """
    Form for uploading images.
    """
    class Meta:
        model = Image
        fields = ['name', 'image']

    name = forms.CharField(max_length=100, label='Enter a name')
    image = forms.ImageField(label='Select an image')
