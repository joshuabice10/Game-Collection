#How to run the Docker Image for Game-Collection
1. Install Docker [Here](https://www.docker.com/)
2. Make sure the user running Docker has permissions to run Docker
3. Navigate to this repo directory and run `docker build -t game_collect .`
4. Then run `docker run -d -p 8000:8000 -p 5000:5000 --name collect_container game_collect`
5. From any browser, access [http://localhost:8000](http://localhost:8000)

This gets you to your `index.html', hosted statically using Python, port 8000, and is running app.py in background on port 5000.

Although, I don't know how your database initializes, and it gets failures on attempting to add data entries.
Recommend an init that adds a single entry?

Otherwise, edit this file to communicate, or enable Discussions on Github.

Thank you! -@DaveTheFave

New update, now adding Kubernet support, you need to install microk8s on a linux machine.
recommend `sudo snap install microk8s`

Then look at the comments on the end of the .yaml file in k8s folder to run it. Have fun!