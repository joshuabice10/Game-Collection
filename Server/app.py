from flask import Flask
from flask import request
from gamesDB import gamesDB

app = Flask(__name__)

@app.route("/games/<int:id>", methods=["OPTIONS"])
def do_preflight(id):
    return '', 204, {"Access-Control-Allow-Origin": "*", 
                     "Access-Control-Allow-Methods": "PUT, DELETE, POST",
                     "Access-Control-Allow-Headers": "Content-Type"}

@app.route("/games", methods=["GET"])
def get_games():
    db = gamesDB("games.db")
    games = db.read_all_records()
    if games:
        return games, 200, {"Access-Control-Allow-Origin":"*"}
    else:
        return "Could not get the list of games", 404, {"Access-Control-Allow-Origin":"*"}

@app.route("/games/<int:id>", methods= ["GET"])
def get_game(id):
    db = gamesDB("games.db")
    game = db.get_record(id)
    if game:
        return game, 200, {"Access-Control-Allow-Origin":"*"}
    else:
        return "Could not get the game", 404, {"Access-Control-Allow-Origin":"*"}

@app.route("/games/<int:id>", methods=["PUT"])
def edit_game(id):
    db = gamesDB("games.db")
    print(request.form)

    game = db.get_record(id)

    title = request.form["title"]
    genre = request.form["genre"]
    platform = request.form["platform"]
    release_year = request.form["releaseYear"]
    rating = request.form["rating"]

    print(game)

    if game:
        d = {"title": title,
        "genre": genre,
        "platform": platform,
        "release_year": release_year,
        "rating": rating}
        db.edit_record(id, d)

        return "Edited", 200, {"Access-Control-Allow-Origin":"*"}
    else:
        return "Cannot edit game with id: {id}", 404, {"Access-Control-Allow-Origin":"*"}

@app.route("/games/<int:id>", methods=["DELETE"])
def delete_trail(id):
    print("I am deleting an object with ID: ", )
    db = gamesDB("games.db")
    game = db.get_record(id)
    if game:
        db.delete_record(id)
        return "Deleted", 200, {"Access-Control-Allow-Origin":"*"}
    else:
        return "Could not delete the game", 404, {"Access-Control-Allow-Origin":"*"}

@app.route("/games", methods=["POST"])
def create_game():
    db = gamesDB("games.db")
    print(request.form)
    d = {"title": request.form["title"],
    "genre": request.form["genre"],
    "platform": request.form["platform"],
    "release_year": request.form["releaseYear"],
    "rating": request.form["rating"]}
    if d:
        db.save_record(d)

        return 'Create', 201, {"Access-Control-Allow-Origin":"*"}
    else:
        return "Could not create game", 404, {"Access-Control-Allow-Origin":"*"}


def main():
    app.run()

main()
