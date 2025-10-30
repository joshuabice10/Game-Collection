"use strict";

const gamesList = document.querySelector(".games");
const submitBtn = document.querySelector(".submit-btn");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close-btn");

let editID = null;

function load() {
  gamesList.innerHTML = "";

  fetch("http://127.0.0.1:5000/games").then(function (response) {
    response.json().then(function (data) {
      console.log(data);
      data.forEach((game) => loadGames(game));
    });
  });
}

function loadGames(game) {
  let title = document.createElement("h3");
  let genre = document.createElement("p");
  let releaseYear = document.createElement("p");
  let rating = document.createElement("p");
  let deleteBtn = document.createElement("button");
  let editBtn = document.createElement("button");

  title.textContent = game.title;
  genre.textContent = `Genre: ${game.genre}`;
  releaseYear.textContent = `Release Year: ${game.release_year}`;
  rating.textContent = `Rating: ${game.rating}`;

  deleteBtn.textContent = "Delete";
  editBtn.textContent = "Edit";
  deleteBtn.classList.add("delete-btn");
  editBtn.classList.add("edit-btn");

  deleteBtn.addEventListener("click", () => {
    let confirmDelete = confirm(
      `Are you sure you want to delete ${game.title}?`
    );
    if (confirmDelete) deleteGame(game.id);
    return;
  });

  editBtn.addEventListener("click", () => {
    modal.style.display = "none";
    editGame(game);
  });

  let gameDiv = document.createElement("div");
  gameDiv.classList.add("game-item");

  gameDiv.append(title, genre, releaseYear, rating, deleteBtn, editBtn);
  gamesList.appendChild(gameDiv);

  gameDiv.addEventListener("click", function () {
    handleGameItemClick(game.id);
  });
}

function addNewGame() {
  let title = document.querySelector(".title").value;
  let genre = document.querySelector(".genre").value;
  let platform = document.querySelector(".platform").value;
  let releaseYear = document.querySelector(".releaseYear").value;
  let rating = document.querySelector(".rating").value;

  let data = "title=" + encodeURIComponent(title);
  data += "&genre=" + encodeURIComponent(genre);
  data += "&platform=" + encodeURIComponent(platform);
  data += "&releaseYear=" + encodeURIComponent(releaseYear);
  data += "&rating=" + encodeURIComponent(rating);

  console.log(data);

  let apiUrl = null;
  let submitMethod = null;
  let submitBtnText = document.querySelector(".submit-btn").textContent;
  if (submitBtnText === "Save Edit") {
    submitMethod = "PUT";
    apiUrl = `http://127.0.0.1:5000/games/${editID}`;
    document.querySelector(".submit-btn").textContent = "Save Game";
  } else {
    submitMethod = "POST";
    apiUrl = "http://127.0.0.1:5000/games";
  }

  fetch(apiUrl, {
    method: submitMethod,
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then(function () {
    load();
  });

  reset_form();
}

function deleteGame(id) {
  console.log("You are going to delete game: ", id);
  fetch(`http://127.0.0.1:5000/games/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then(function (response) {
    console.log("Deleted");
    load();
    modal.style.display = "none";
  });
}

function editGame(game) {
  console.log("You are going to edit game: ", game.id);
  document.querySelector(".title").value = game.title;
  document.querySelector(".genre").value = game.genre;
  document.querySelector(".platform").value = game.platform;
  document.querySelector(".releaseYear").value = game.release_year;
  document.querySelector(".rating").value = game.rating;

  let submitBtn = document.querySelector(".submit-btn");
  submitBtn.textContent = "Save Edit";

  editID = game.id;
}

function reset_form() {
  document.querySelector(".title").value = "";
  document.querySelector(".genre").value = "";
  document.querySelector(".platform").value = "";
  document.querySelector(".releaseYear").value = "";
  document.querySelector(".rating").value = "";
}

function openModal(game) {
  document.querySelector(".modalTitle").textContent = game.title;
  document.querySelector(".modalGenre").textContent = game.genre;
  document.querySelector(".modalPlatform").textContent = game.platform;
  document.querySelector(".modalReleaseYear").textContent = game.release_year;
  document.querySelector(".modalRating").textContent = game.rating;

  modal.style.display = "flex";
}

function handleGameItemClick(id) {
  fetch(`http://127.0.0.1:5000/games/${id}`).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
      openModal(data);
    });
  });
}

closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

submitBtn.addEventListener("click", addNewGame);

load();
