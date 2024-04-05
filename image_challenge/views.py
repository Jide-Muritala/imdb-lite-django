from django.shortcuts import render, redirect, get_object_or_404
from .models import Image, Comment
import boto3
from django.conf import settings
from .forms import ImageUploadForm
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

def image_list(request):
    """
    View function to render a list of all uploaded images in HTML or JSON format.
    """
    images = Image.objects.all()

    # Check the Accept header to determine the response format
    if request.headers.get('Accept') == 'application/json':
        # Serialize the queryset into JSON format
        data = list(images.values())  # Convert queryset to list of dictionaries
        return JsonResponse(data, safe=False)
    else:
        # Return HTML response
        return render(request, 'image_challenge/image_list.html', {'images': images})

def image_detail(request, image_id):
    """
    View function to render details of a specific image.
    """
    image = get_object_or_404(Image, pk=image_id)
    return render(request, 'image_challenge/image_detail.html', {'image': image})

@csrf_exempt
def upload_image(request):
    """
    View function for handling image upload.
    """
    if request.method == 'POST':
        form = ImageUploadForm(request.POST, request.FILES)
        if form.is_valid():
            # Save the form data to the database
            form.save()

            # Upload file to AWS S3
            file = request.FILES['image']
            s3 = boto3.client('s3',
                              aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                              aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
                              region_name=settings.AWS_S3_REGION_NAME)
            bucket_name = settings.AWS_STORAGE_BUCKET_NAME
            file_name = file.name
            s3.upload_fileobj(file, bucket_name, file_name)

            # Redirect to the image list page
            return redirect('image_list')
    else:
        form = ImageUploadForm()
    return render(request, 'image_challenge/upload_image.html', {'form': form})

""" def delete_image(request, image_id):
    if request.method == 'POST':
        image = get_object_or_404(Image, pk=image_id)
        image.delete()
    return redirect('image_list') """

def add_comment(request, image_id):
    """
    View function to handle adding a comment to a specific image.
    """
    if request.method == 'POST':
        image = Image.objects.get(id=image_id)
        text = request.POST.get('text')
        Comment.objects.create(image=image, text=text)
    return redirect('image_detail', image_id=image_id)

def delete_comment(request, image_id, comment_id):
    if request.method == 'POST':
        comment = get_object_or_404(Comment, pk=comment_id)
        comment.delete()
    return redirect('image_detail', image_id=image_id)
