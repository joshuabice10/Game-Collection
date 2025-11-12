FROM python:3.11-slim

# Use /app as working directory
WORKDIR /app

# Install small system deps (if needed for some packages)
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libffi-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy and install Python dependencies
RUN pip install --no-cache-dir flask gunicorn

# Copy the project into the container
COPY . /app

# Expose ports used by Flask (5000) and the static server (8000)
EXPOSE 5000
EXPOSE 8000

# Start a lightweight static file server for the client on port 8000 in the background,
# then start gunicorn in the foreground to serve the Flask API on port 5000.
# Using a shell form lets us background the http.server and then exec gunicorn so
# the container PID 1 is gunicorn (proper signal handling).
CMD ["/bin/sh", "-c", "python3 -m http.server 8000 --directory /app/Client --bind 0.0.0.0 & exec gunicorn -w 4 -b 0.0.0.0:5000 Server.app:app"]
