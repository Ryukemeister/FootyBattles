"use strict";
import { apiKey, apiKEY } from "./utils.js";

const toggleBtn = document.querySelector(".hamburger-icon");
const crossBtn = document.querySelector(".cross-icon");
const sidebar = document.querySelector(".sidebar");
const player = document.querySelector(".player-image");

toggleBtn.addEventListener("click", function () {
  sidebar.classList.add("active");
});

crossBtn.addEventListener("click", function () {
  sidebar.classList.remove("active");
});

const checkIfArray = function (el) {
  // Another way to check if the el is not is the instance of method
  // if(el instanceof Array)
  if (!Array.isArray(el)) {
    console.log(el);
  } else {
    console.log(el[0]);
  }
};

const desiredPlayerName = "robert lewandowski";

const getDesiredPlayer = function () {
  fetch(
    "https://sportscore1.p.rapidapi.com/players/search?locale=en&name=" +
      desiredPlayerName,
    {
      method: "POST",
      headers: {
        "x-rapidapi-host": "sportscore1.p.rapidapi.com",
        "x-rapidapi-key": apiKey,
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      const { data } = response;
      const playerInfo = data.find(
        //(player) => player.name.toLowerCase() === desiredPlayerName
        (player) =>
          player.slug.split("-").join(" ").toLowerCase() === desiredPlayerName
      );
      console.table(playerInfo);
      // console.log(playerInfo.slug);
      // console.log(playerInfo.slug.split("-").join(" "));

      const {
        name,
        age,
        position_name,
        date_birth_at,
        shirt_number,
        position,
        flag,
        photo,
        id,
        preferred_foot,
        positions,
      } = playerInfo;
      //console.table(playerId);
      // console.log(response.data);
      // player.src = `${photo}`;
      console.log(
        name,
        age,
        position,
        date_birth_at,
        shirt_number,
        preferred_foot,
        flag
        // positions
      );
      checkIfArray(positions.main);
      getPlayerClub(id);
      //getPlayerStat(id);
    })
    .catch((err) => {
      console.error(err);
    });
};

const getPlayerClub = function (playerId) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "sportscore1.p.rapidapi.com",
      "X-RapidAPI-Key": apiKey,
    },
  };

  fetch(
    "https://sportscore1.p.rapidapi.com/players/" + playerId + "/teams?page=1",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      const { data } = response;
      if (!Array.isArray(data)) {
        console.log(data);
        console.log(data.logo);
      } else {
        console.log(data[0]);
        console.log(data[0].logo);
      }
      // console.log(data);
      // console.log(data[0].logo);
    })
    .catch((err) => console.error(err));
};

// getDesiredPlayer();
