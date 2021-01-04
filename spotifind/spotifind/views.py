from django.shortcuts import render
from django.views.generic import (ListView, DetailView)
from django import forms

from backend import GetGenius
from backend import GetSpotify
from backend import GetWhoosh

from .models import Song
from .forms import SearchForm


def home(request):
    message = ''
    query = ''
    ranks = []
    songs = []

    if request.method == 'GET':
        form = SearchForm(request.GET)
        if form.is_valid():
            message = 'success'

            # clear data from database to save space
            mongo_songs = Song.objects.all()
            mongo_songs.delete()

            query = request.GET.get('search')
            # get data from Genius
            lyrics = GetGenius.GetGenius().get_lyrics(query)
            for data in lyrics:
                # data = [docid, title, artist, url_img, lyric]
                # get spotify url by artist & track title
                url_spotify = GetSpotify.GetSpotify().get_song(
                    data[2], data[1])
                if len(url_spotify) != 0:
                    url_spotify = url_spotify[0]
                    print(url_spotify)
                else:
                    url_spotify = None

                # save data to database for SongDetailView
                song, created = Song.objects.get_or_create(pk=data[0], defaults={
                    'docid': data[0], 'title': data[1], 'artist': data[2], 'lyrics': data[4], 'url_img': data[3], 'url_spotify': url_spotify,
                })

            # get rank from IR indexing
            ranks = GetWhoosh.GetWhoosh().get_rank(query)
            for rank in ranks:
                song = Song.objects.get(pk=rank)
                songs.append(song)
            # print(ranks)

    else:
        form = SearchForm()
        message = 'error'

    context = {
        'message': message,
        'form': form,
        'query': query,
        'songs': songs
    }
    return render(request, 'spotifind/home.html', context)


class SongDetailView(DetailView):
    model = Song


authors = [
    {
        'id': 1,
        'name': 'Ellee Chen',
        'email': 'yec24@pitt.edu',
        'job': 'Full-Stack',
    },
    {
        'id': 2,
        'name': 'Xinming Liu',
        'email': 'xil231@pitt.edu',
        'job': 'Backend',
    }
]


def about(request):
    context = {
        'authors': authors
    }
    return render(request, 'spotifind/about.html', context)
