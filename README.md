# Resourceful — Games API & Client

A small CRUD web application that manages a single resource: games.  
Server: Python + Flask + SQLite.  
Client: Vanilla JavaScript, HTML, CSS (Ajax via fetch).

## Resource

Name: `games`

Attributes (each record contains):

- `id` (INTEGER, primary key, auto-increment)
- `title` (TEXT) — game title
- `genre` (TEXT)
- `platform` (TEXT)
- `release_year` (INTEGER)
- `rating` (TEXT)

## Database schema

Valid SQLite CREATE TABLE statement:

```sql
CREATE TABLE games (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  genre TEXT,
  platform TEXT,
  release_year INTEGER,
  rating TEXT
);
```

Run the above against `Server/games.db` if you need to (or include it in an initialization script).

## API Endpoints

All endpoints include CORS headers. Create/Replace expect form-encoded bodies (Content-Type: application/x-www-form-urlencoded). The server maps client `releaseYear` form field to DB `release_year`.

1. List

   - Method: GET
   - Path: `/games`
   - Success: 200 OK — JSON array of game objects

2. Retrieve

   - Method: GET
   - Path: `/games/<id>`
   - Success: 200 OK — JSON object for the game
   - Not found: 404 Not Found

3. Create

   - Method: POST
   - Path: `/games`
   - Body (form fields): `title`, `genre`, `platform`, `releaseYear`, `rating`
   - Success: 201 Created

4. Replace (update)

   - Method: PUT
   - Path: `/games/<id>`
   - Body (form fields): `title`, `genre`, `platform`, `releaseYear`, `rating`
   - Success: 200 OK
   - Not found: 404 Not Found

5. Delete

   - Method: DELETE
   - Path: `/games/<id>`
   - Success: 200 OK
   - Not found: 404 Not Found

6. Preflight (CORS)
   - Method: OPTIONS
   - Path example implemented: `/games/<id>`
   - Success: 204 No Content with Access-Control-Allow-\* headers

## Client

Files: `Client/index.html`, `Client/script.js`, `Client/style.css`  
Features:

- List games (at least two attributes shown)
- Form to create and update (pre-fills on Edit)
- Edit/save and Delete actions using the API
- Modal to view a game's attributes (uses GET /games/<id>)
- All requests performed with fetch() (Ajax)

## Server

Files: `Server/app.py`, `Server/gamesDB.py`, `Server/games.db`  
Run: `python Server/app.py` (server listens on 127.0.0.1:5000 by default)

## Notes / Known issues

- Client currently sends `releaseYear` (form) which the server maps to `release_year` in the database.
- Consider adding global OPTIONS handling for `/games` (POST preflight) and consistent JSON error bodies.
- Small client bug: ensure `apiUrl` variable is set correctly for POST requests and confirm() is used before deletes.

```// filepath: /Users/joshsmacbookpro/Desktop/UtahTech/SE3200/f25-resourceful-joshuabice10/README.md
# Resourceful — Games API & Client

A small CRUD web application that manages a single resource: games.
Server: Python + Flask + SQLite.
Client: Vanilla JavaScript, HTML, CSS (Ajax via fetch).

```
