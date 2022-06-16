"use strict";
import { apiKey, apiKEY, APIKEY } from "./utils.js";

const toggleBtn = document.querySelector(".hamburger-icon");
const crossBtn = document.querySelector(".cross-icon");
const sidebar = document.querySelector(".sidebar");
const playerImage = document.querySelector(".player-picture");
const playerPosition = document.querySelector(".player-position");
const playerClub = document.querySelector(".club-picture");
const playerJerseyNumber = document.querySelector(".player-jersey-number");
const playerName = document.querySelector(".player-name");
const playerGoals = document.querySelector(".player-goals");
const playerAssists = document.querySelector(".player-assists");
const playerMatches = document.querySelector(".player-matches");

/*
console.log(playerName.textContent.toUpperCase());
console.log(playerImage);
console.log(playerPosition.textContent);
console.log(playerClub.src);
console.log(playerJerseyNumber.textContent);
*/

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
    return el;
  } else {
    return el[0];
  }
};

const getStatsFromFieldName = function (competion, fieldName) {
  return competion.find((item) => item.group_name.toLowerCase() === fieldName);
};

const updatePlayerDetails = function (name, img, pos, number, club) {
  playerName.textContent = name.toUpperCase();
  playerImage.src = img;
  playerPosition.textContent = pos;
  //  playerClub.src = club;
  playerJerseyNumber.textContent = number;
  // playersClubImage(id);
  // getPlayerClub(id);
};

const getAllStats = function (id, apikey) {
  return fetch(
    "https://sportscore1.p.rapidapi.com/players/" + id + "/statistics",
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "sportscore1.p.rapidapi.com",
        "x-rapidapi-key": APIKEY,
      },
    }
  )
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
      // console.log(getListOfLeagues);
      const competitionName = getListOfLeagues[0];
      const statsForSpecificCompetion = data.filter(
        (obj) =>
          obj.season.slug.startsWith("2021") &&
          obj.season.name
            .toLowerCase()
            .startsWith(competitionName.toLocaleLowerCase().slice(0, 2))
      );

      // console.log(statsForSpecificCompetion);

      const [{ details }] = statsForSpecificCompetion;
      // console.log(details);

      return details;
    })
    .catch((err) => {
      console.error(err);
    });
};

const getStrikerStats = function (id, apikey) {
  const stats = getAllStats(id, apikey);
  stats.then((response) => {
    const matchesStats = getStatsFromFieldName(response, "matches");
    const attackingStats = getStatsFromFieldName(response, "attacking");
    const defendingStats = getStatsFromFieldName(response, "defending");
    const pasingStats = getStatsFromFieldName(response, "passes");
    const foulStats = getStatsFromFieldName(response, "cards");
    const otherStats = getStatsFromFieldName(response, "other (per game)");

    playerMatches.innerHTML = matchesStats.matches_total;
    playerGoals.innerHTML = attackingStats.goals;
    playerAssists.innerHTML = pasingStats.assists;

    console.log(attackingStats);
    console.log(pasingStats);
    console.log(otherStats);
    console.log(matchesStats);
    // console.log(attackingStats.group_name);
  });
};

// getStrikerStats();

const getDefenderStats = function (id, apikey) {
  const stats = getAllStats(id, apikey);
  stats.then((response) => {
    const matchesStats = getStatsFromFieldName(response, "matches");
    const attackingStats = getStatsFromFieldName(response, "attacking");
    const defendingStats = getStatsFromFieldName(response, "defending");
    const pasingStats = getStatsFromFieldName(response, "passes");
    const foulStats = getStatsFromFieldName(response, "cards");
    const otherStats = getStatsFromFieldName(response, "other (per game)");

    playerMatches.innerHTML = matchesStats.matches_total;
    playerGoals.innerHTML = attackingStats.goals;
    playerAssists.innerHTML = pasingStats.assists;

    console.log(defendingStats);
    console.log(defendingStats.group_name);
  });
};

// getDefenderStats();

const getMidfielderStats = function (id, apikey) {
  const stats = getAllStats(id, apikey);
  stats.then((response) => {
    const matchesStats = getStatsFromFieldName(response, "matches");
    const attackingStats = getStatsFromFieldName(response, "attacking");
    const defendingStats = getStatsFromFieldName(response, "defending");
    const pasingStats = getStatsFromFieldName(response, "passes");
    const foulStats = getStatsFromFieldName(response, "cards");
    const otherStats = getStatsFromFieldName(response, "other (per game)");

    playerMatches.innerHTML = matchesStats.matches_total;
    playerGoals.innerHTML = attackingStats.goals;
    playerAssists.innerHTML = pasingStats.assists;

    console.log(pasingStats);
    //console.log(pasingStats.group_name);
  });
};

const getGoalieStats = function (id, apikey) {
  const stats = getAllStats(id, apikey);
  stats.then((response) => {
    const matchesStats = getStatsFromFieldName(response, "matches");
    const goalKeepingStats = getStatsFromFieldName(response, "goalkeeping");
    const attackingStats = getStatsFromFieldName(response, "attacking");
    const defendingStats = getStatsFromFieldName(response, "defending");
    const pasingStats = getStatsFromFieldName(response, "passes");
    const foulStats = getStatsFromFieldName(response, "cards");
    const otherStats = getStatsFromFieldName(response, "other (per game)");

    playerAssists.innerHTML = pasingStats.assists;
    playerGoals.innerHTML = attackingStats.goals;

    console.log(goalKeepingStats);
    console.log(goalKeepingStats.group_name);
  });
};

// getGoalieStats(73111, apiKEY);

// const desiredPlayerName = "lionel messi";
// const desiredPlayerName = "mason mountt";
// const desiredPlayerName = "thiago silva";

const desiredPlayerName = "riyad mahrez";

// console.log(getAllStats(73111, apiKEY));

const getDesiredPlayer = function () {
  fetch(
    "https://sportscore1.p.rapidapi.com/players/search?locale=en&name=" +
      desiredPlayerName,
    {
      method: "POST",
      headers: {
        "x-rapidapi-host": "sportscore1.p.rapidapi.com",
        "x-rapidapi-key": APIKEY,
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
      // console.log(playerInfo);

      // console.log(playerInfo.slug);
      // console.log(playerInfo.slug.split("-").join(" "));

      const { name, position_name, shirt_number, photo, id, positions } =
        playerInfo;
      //console.table(playerId);
      // console.log(response.data);
      // player.src = `${photo}`;
      const playerPos = checkIfArray(positions.main);

      //console.log(name, shirt_number, positions);
      //console.log(position_name.toLowerCase());
      //console.log(photo);
      //console.log(playerPos);
      //console.log(id);

      if (position_name.toLowerCase() == "forward") {
        getStrikerStats(id, apiKey);
        updatePlayerDetails(name, photo, playerPos, shirt_number);
        getPlayersClubFromId(id);
      } else if (position_name.toLowerCase() == "midfielder") {
        getMidfielderStats(id, apiKey);
        updatePlayerDetails(name, photo, playerPos, shirt_number);
        getPlayersClubFromId(id);
      } else if (position_name.toLowerCase() == "defender") {
        getDefenderStats(id, apiKey);
        updatePlayerDetails(name, photo, playerPos, shirt_number);
        getPlayersClubFromId(id);
      } else {
        getGoalieStats(id, apiKey);
        updatePlayerDetails(name, photo, playerPos, shirt_number);
        getPlayersClubFromId(id);
      }

      // getPlayerClub(id);
      // getPlayerStat(id);
    })
    .catch((err) => {
      console.error(err);
    });
};

//getDesiredPlayer();

const getPlayersClubFromId = async function (playerId) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "sportscore1.p.rapidapi.com",
      "X-RapidAPI-Key": APIKEY,
    },
  };

  const response = await fetch(
    "https://sportscore1.p.rapidapi.com/players/" + playerId + "/teams?page=1",
    options
  );
  const result = await response.json();
  const { data } = result;
  playerClub.src = data[0].logo;
  // console.log(data);
};

/*
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
        //console.log(data);
        console.log(data.logo);
        playerClub.src = data.logo;
      } else {
        //console.log(data[0]);
        console.log(data[0].logo);
        playerClub.src = data[0].logo;
      }
    })
    .catch((err) => console.error(err));
};
*/

// getPlayersClubFromId(67899);
// console.log(club);

/*
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
*/

// id = 50428
