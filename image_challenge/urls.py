from django.urls import path
from . import views

#URLConf
urlpatterns = [
    path('', views.image_list, name='image_list'),
    path('image/<int:image_id>/', views.image_detail, name='image_detail'),
    path('image/<int:image_id>/add_comment/', views.add_comment, name='add_comment'),
]
