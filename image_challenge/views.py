from django.shortcuts import render
from .models import Image, Comment

def image_list(request):
    """
    View function to render a list of all uploaded images.
    """
    images = Image.objects.all()
    return render(request, 'image_challenge/image_list.html', {'images': images})

def image_detail(request, image_id):
    """
    View function to render details of a specific image.
    """
    image = Image.objects.get(id=image_id)
    return render(request, 'image_challenge/image_detail.html', {'image': image})

def add_comment(request, image_id):
    """
    View function to handle adding a comment to a specific image.
    """
    if request.method == 'POST':
        image = Image.objects.get(id=image_id)
        text = request.POST.get('text')
        Comment.objects.create(image=image, text=text)
    return redirect('image_detail', image_id=image_id)
