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

const desiredPlayerName = "lionel messi";

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
      console.log(playerInfo.slug);
      console.log(playerInfo.slug.split("-").join(" "));

      const {
        name,
        age,
        position_name,
        date_birth_at,
        shirt_number,
        flag,
        photo,
        id,
        preferred_foot,
      } = playerInfo;
      //console.table(playerId);
      console.log(response.data);
      // player.src = `${photo}`;
      console.log(
        name,
        age,
        position_name,
        date_birth_at,
        shirt_number,
        flag,
        preferred_foot
      );

      //getPlayerStat(id);
    })
    .catch((err) => {
      console.error(err);
    });
};

// getDesiredPlayer();
