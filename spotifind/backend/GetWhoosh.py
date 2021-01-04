import os
import shutil

from pathlib import Path
from pymongo import MongoClient

from whoosh import scoring
from whoosh.index import create_in
from whoosh.fields import Schema, TEXT
from whoosh.qparser import QueryParser


class GetWhoosh:
    def __init__(self):
        # init mongodb connection
        MONGODB_URL = os.getenv('MONGODB_URL')
        client = MongoClient(MONGODB_URL)

        # connect to database
        db = client['final']
        self.songs = db.spotifind_song  # pass-down

        # difine root path
        path_root = os.getcwd()

        # define whoosh index schema
        schema = Schema(title=TEXT(stored=True), content=TEXT(stored=True))

        # delete index files for next run
        os.chdir(path_root)
        shutil.rmtree('.//_data', ignore_errors=True)

        # create index object
        path_index = Path('.//_data')
        path_index.mkdir(parents=True, exist_ok=True)
        self.ix = create_in(path_index, schema)  # pass-down

    def get_rank(self, query):
        # final result to be returned
        ranks = []

        # write index
        writer = self.ix.writer()
        for song in self.songs.find():
            title = str(song['docid']) + '_' + song['title']
            content = song['lyrics']
            writer.add_document(title=title, content=content)
        writer.commit()

        # search again using the index built
        with self.ix.searcher(weighting=scoring.TF_IDF()) as searcher:
            new_query = QueryParser('content', self.ix.schema).parse(query)
            new_result = searcher.search(new_query, limit=10)
            for entry in new_result:
                docid = entry['title'].split('_')[0]
                ranks.append(docid)

        return(ranks)
