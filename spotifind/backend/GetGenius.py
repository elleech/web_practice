import os
from lyricsgenius import Genius


class GetGenius:
    def __init__(self):
        # init Genius
        GENIUS_ACCESS_TOKEN = os.getenv('GENIUS_ACCESS_TOKEN')
        self.genius = Genius(GENIUS_ACCESS_TOKEN)

    def get_lyrics(self, query):
        lyrics = []

        results = self.genius.search_lyrics(query)
        for hit in results['sections'][0]['hits']:
            if hit['result']['title'][-4:] != 'list':
                docid = hit['result']['id']
                title = str(hit['result']['title']).replace(
                    '/', ' ').replace('?', ' ')
                artist = hit['result']['primary_artist']['name']
                url_img = hit['result']['song_art_image_url']
                lyric = self.genius.search_song(title, artist).lyrics

                lyrics.append([docid, title, artist, url_img, lyric])

        return(lyrics)
