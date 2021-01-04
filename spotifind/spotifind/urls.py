from django.urls import path
from .views import SongDetailView
from . import views

urlpatterns = [
    path('', views.home, name='spotifind-home'),
    # path('', SongListView.as_view(), name='spotifind-home'),
    path('song/<int:pk>/', SongDetailView.as_view(), name='spotifind-detail'),
    path('about/', views.about, name='spotifind-about'),
]
