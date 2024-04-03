from django.urls import path
from . import views

#URLConf
urlpatterns = [
    path('', views.image_list, name='image_list'),
    path('image/<int:image_id>/', views.image_detail, name='image_detail'),
    path('upload/', views.upload_image, name='upload_image'),
    path('image/<int:image_id>/add_comment/', views.add_comment, name='add_comment'),
    path('delete_image/<int:image_id>/', views.delete_image, name='delete_image'),
    path('delete_comment/<int:image_id>/<int:comment_id>/', views.delete_comment, name='delete_comment'),
]
