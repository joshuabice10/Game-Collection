import sqlite3

def dict_factory(cursor, row):
    fields = []
    for column in cursor.description:
        fields.append(column[0])

    result_dict = {}
    for i in range(len(fields)):
        result_dict[fields[i]] = row[i]

    return result_dict

class gamesDB: 

    def __init__(self, dbfilename):
        self.dbfilename = dbfilename
        self.connection = sqlite3.connect(dbfilename)
        self.cursor = self.connection.cursor()

    def read_all_records(self):
        self.cursor.execute("SELECT * FROM games")
        rows = self.cursor.fetchall()
        all = []
        for row in rows:
            d = dict_factory(self.cursor, row)
            all.append(d)
        print("The rows are ", all, "\n")
        return all
    
    def get_record(self, id):
        self.cursor.execute("SELECT * FROM games WHERE id = ?;", [id])
        row = self.cursor.fetchone()
        if row is None:
            return None
        return dict_factory(self.cursor, row)

    def save_record(self, record):
        data = [record["title"], record["genre"], record["platform"], record["release_year"], record["rating"]]
        self.cursor.execute("INSERT INTO games (title, genre, platform, release_year, rating) VALUES (?, ?, ?, ?, ?);", data)
        self.connection.commit()

    def delete_record(self, id):
        self.cursor.execute("DELETE FROM games WHERE id = ?;", [id])
        self.connection.commit()

    def edit_record(self, id, record):
        data = [record["title"], record["genre"], record["platform"], record["release_year"], record["rating"], id]

        self.cursor.execute("UPDATE games SET title=?, genre=?, platform=?, release_year=?, rating=? WHERE id = ?;", data)
        self.connection.commit()

    def close(self):
        self.connection.close()

