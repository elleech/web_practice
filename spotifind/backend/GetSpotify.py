import os
import spotipy
from spotipy.oauth2 import SpotifyOAuth


class GetSpotify:
    def __init__(self):
        # init spotify connection
        SPOTIPY_CLIENT_ID = os.getenv('SPOTIPY_CLIENT_ID')
        SPOTIPY_CLIENT_SECRET = os.getenv('SPOTIPY_CLIENT_SECRET')
        SPOTIPY_REDIRECT_URI = os.getenv('SPOTIPY_REDIRECT_URI')

        # get oauth
        auth_manager = SpotifyOAuth(
            client_id=SPOTIPY_CLIENT_ID,
            client_secret=SPOTIPY_CLIENT_SECRET,
            redirect_uri=SPOTIPY_REDIRECT_URI,
            scope='')

        # check if authorization success
        # access_token = auth_manager.get_access_token()
        # if access_token:
        #     print(access_token)
        # else:
        #     print('Cannot get the token!')

        self.sp = spotipy.Spotify(auth_manager=auth_manager)  # pass-down

    def get_song(self, artist, track):
        # final result to be returned
        songs = []

        # search song by song title (track)
        results = self.sp.search(q='track:' + track, type='track')
        # print(results)
        items = results['tracks']['items']
        for item in items:
            artist_name = item['artists'][0]['name']
            if artist_name == artist:
                songs.append(item['external_urls']['spotify'])

        return(songs)
