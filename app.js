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

const getStatsFromFieldName = function (competion, fieldName) {
  return competion.find((item) => item.group_name.toLowerCase() === fieldName);
};

const getAllStats = function (id, apikey) {};

const getStrikerStats = function () {
  getAllStats();
  console.log(details);
};
const getDefenderStats = function () {};
const getMidfielderStats = function () {};
const getGoalieStats = function () {};

const desiredPlayerName = "edouard mendy";

console.log(getAllStats(73111, apiKEY));

const getDesiredPlayer = function () {
  fetch(
    "https://sportscore1.p.rapidapi.com/players/search?locale=en&name=" +
      desiredPlayerName,
    {
      method: "POST",
      headers: {
        "x-rapidapi-host": "sportscore1.p.rapidapi.com",
        "x-rapidapi-key": apiKEY,
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
      console.log(playerInfo);

      // console.log(playerInfo.slug);
      // console.log(playerInfo.slug.split("-").join(" "));

      const { name, position_name, shirt_number, photo, id, positions } =
        playerInfo;
      //console.table(playerId);
      // console.log(response.data);
      // player.src = `${photo}`;
      console.log(name, shirt_number, positions, position_name);
      checkIfArray(positions.main);
      getPlayerClub(id);
      getPlayerStat(id);
    })
    .catch((err) => {
      console.error(err);
    });
};

const getPlayerStat = function (id) {
  fetch("https://sportscore1.p.rapidapi.com/players/" + id + "/statistics", {
    method: "GET",
    headers: {
      "x-rapidapi-host": "sportscore1.p.rapidapi.com",
      "x-rapidapi-key": apiKEY,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((info) => {
      const { data } = info;
      //console.log(data);
      const currentSeasonStats = data.filter((obj) =>
        obj.season.slug.startsWith("2021-2022")
      );
      const getListOfLeagues = currentSeasonStats.map(
        (competion) => competion.season.name
      );
      console.log(getListOfLeagues);
      const competitionName = getListOfLeagues[0];
      const statsForSpecificCompetion = data.filter(
        (obj) =>
          obj.season.slug.startsWith("2021") &&
          obj.season.name
            .toLowerCase()
            .startsWith(competitionName.toLocaleLowerCase().slice(0, 2))
      );
      // console.log(currentSeasonStats);
      console.log(statsForSpecificCompetion);

      //console.log(statsForSpecificCompetion[0].details);
      const [{ details }] = statsForSpecificCompetion;
      console.log(details);

      const detailedStatsForSeason = currentSeasonStats.flatMap(
        (item) => item.details
      );
      //console.log(detailedStatsForCompetition);
      //console.log(detailedStatsForSeason);

      const matchesStats = getStatsFromFieldName(details, "matches");
      const attackingStats = getStatsFromFieldName(details, "attacking");
      const defendingStats = getStatsFromFieldName(details, "defending");
      const pasingStats = getStatsFromFieldName(details, "passes");
      const foulStats = getStatsFromFieldName(details, "cards");
      const otherStats = getStatsFromFieldName(details, "other (per game)");
      console.table(matchesStats);
      console.table(attackingStats);
      console.table(pasingStats);
      console.table(defendingStats);
      console.table(foulStats);
      console.table(otherStats);
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
      "X-RapidAPI-Key": apiKEY,
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
