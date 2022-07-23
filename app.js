"use strict";
// import "./node_modules/dotenv";
import { APIKEY_1 } from "./config.js";

require("dotenv").config();
const API_KEY = process.env.APIKEY_1;

const toggleBtn = document.querySelector(".hamburger-icon");
const crossBtn = document.querySelector(".cross-icon");
const sidebar = document.querySelector(".sidebar");

const submitBtn = document.getElementById("submittt-btn");
const searchBtn = document.querySelector(".search-iconnn");

// All input fields for the scorecard of left-section

const playerImage1 = document.querySelector(".player-picture");
const playerPosition1 = document.querySelector(".player-position");
const playerClub1 = document.querySelector(".club-picture");
const playerJerseyNumber1 = document.querySelector(".player-jersey-number");
const playerName1 = document.querySelector(".player-name");

const playerGoals1 = document.querySelector(".player-goals-1");
const playerAssists1 = document.querySelector(".player-assists-1");
const playerMatches1 = document.querySelector(".player-matches-1");
const playerGoalConversion1 = document.querySelector(
  ".player-goal-conversion-1"
);
const playerTouches1 = document.querySelector(".player-touches-1");
const playerBigChances1 = document.querySelector(".player-big-chances-1");
const playerDualsWon1 = document.querySelector(".player-duals-won-1");
const playerDribbles1 = document.querySelector(".player-dribbles-1");

const goals1 = document.querySelector(".goals-1");
const assists1 = document.querySelector(".assists-1");
const rate1 = document.querySelector(".rate-1");
const touches1 = document.querySelector(".touches-1");
const shots1 = document.querySelector(".shots-1");
const chances1 = document.querySelector(".chances-1");
const dribbles1 = document.querySelector(".dribbles-1");

// All input fields for the scorecard of right-section

const playerImage2 = document.querySelector(".player-picture-2");
const playerPosition2 = document.querySelector(".player-position-2");
const playerClub2 = document.querySelector(".club-picture-2");
const playerJerseyNumber2 = document.querySelector(".player-jersey-number-2");
const playerName2 = document.querySelector(".player-name-2");

const playerGoals2 = document.querySelector(".player-goals-2");
const playerAssists2 = document.querySelector(".player-assists-2");
const playerMatches2 = document.querySelector(".player-matches-2");
const playerGoalConversion2 = document.querySelector(
  ".player-goal-conversion-2"
);
const playerTouches2 = document.querySelector(".player-touches-2");
const playerBigChances2 = document.querySelector(".player-big-chances-2");
const playerDualsWon2 = document.querySelector(".player-duals-won-2");
const playerDribbles2 = document.querySelector(".player-dribbles-2");

const goals2 = document.querySelector(".goals-2");
const assists2 = document.querySelector(".assists-2");
const rate2 = document.querySelector(".rate-2");
const touches2 = document.querySelector(".touches-2");
const shots2 = document.querySelector(".shots-2");
const chances2 = document.querySelector(".chances-2");
const dribbles2 = document.querySelector(".dribbles-2");

// Input search boxes for both search boxes

const searchBoxOne = document.querySelector(".search-box-1");
const searchBoxTwo = document.querySelector(".search-box-2");

// Buttons for both search boxes
const submitLeft = document.getElementById("submit-btn-left");
const submitRight = document.getElementById("submit-btn-right");

// Function for left search bar query submit
submitLeft.addEventListener("submit", function (e) {
  e.preventDefault();
  getDesiredPlayer(searchBoxOne.value.toLowerCase(), "one");
  searchBoxOne.value = "";
  setTimeout(function () {
    document
      .querySelector(".scorecard-one")
      .classList.remove("scorecard-one-invisible");
  }, 4000);
});

// Function for right search bar query submit
submitRight.addEventListener("submit", function (e) {
  e.preventDefault();
  getDesiredPlayer(searchBoxTwo.value.toLowerCase(), "two");
  searchBoxTwo.value = "";
  setTimeout(function () {
    document
      .querySelector(".scorecard-two")
      .classList.remove("scorecard-two-invisible");
  }, 4000);
});

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

const updatePlayerDetails = function (name, img, pos, number, scorecardNumber) {
  if (scorecardNumber === "one") {
    playerName1.textContent = name.toUpperCase();
    playerImage1.src = img;
    playerPosition1.textContent = pos;
    playerJerseyNumber1.textContent = number;
  } else if (scorecardNumber === "two") {
    playerName2.textContent = name.toUpperCase();
    playerImage2.src = img;
    playerPosition2.textContent = pos;
    playerJerseyNumber2.textContent = number;
  }

  //  playerClub.src = club;
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
        "x-rapidapi-key": apikey,
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

const getStrikerStats = function (id, apikey, scorecardNumber) {
  const stats = getAllStats(id, apikey);
  stats.then((response) => {
    const matchesStats = getStatsFromFieldName(response, "matches");
    const attackingStats = getStatsFromFieldName(response, "attacking");
    const defendingStats = getStatsFromFieldName(response, "defending");
    const pasingStats = getStatsFromFieldName(response, "passes");
    const foulStats = getStatsFromFieldName(response, "cards");
    const otherStats = getStatsFromFieldName(response, "other (per game)");

    if (scorecardNumber === "one") {
      playerMatches1.innerHTML = matchesStats.matches_total;
      playerGoals1.innerHTML = attackingStats.goals;
      playerAssists1.innerHTML = pasingStats.assists;
      playerGoalConversion1.innerHTML = attackingStats.more.goal_conversion;
      playerTouches1.innerHTML = pasingStats.touches;
      playerBigChances1.innerHTML = pasingStats.big_chance_created;
      playerDualsWon1.innerHTML = attackingStats.total_shots_per_game;
      playerDribbles1.innerHTML = otherStats.successful_dribbles_per_game.slice(
        0,
        3
      );
    } else if (scorecardNumber === "two") {
      playerMatches2.innerHTML = matchesStats.matches_total;
      playerGoals2.innerHTML = attackingStats.goals;
      playerAssists2.innerHTML = pasingStats.assists;
      playerGoalConversion2.innerHTML = attackingStats.more.goal_conversion;
      playerTouches2.innerHTML = pasingStats.touches;
      playerBigChances2.innerHTML = pasingStats.big_chance_created;
      playerDualsWon2.innerHTML = attackingStats.total_shots_per_game;
      playerDribbles2.innerHTML = otherStats.successful_dribbles_per_game.slice(
        0,
        3
      );
    }
  });
};

const getMidfielderStats = function (id, apikey, scorecardNumber) {
  const stats = getAllStats(id, apikey);
  stats.then((response) => {
    const matchesStats = getStatsFromFieldName(response, "matches");
    const attackingStats = getStatsFromFieldName(response, "attacking");
    const defendingStats = getStatsFromFieldName(response, "defending");
    const pasingStats = getStatsFromFieldName(response, "passes");
    const foulStats = getStatsFromFieldName(response, "cards");
    const otherStats = getStatsFromFieldName(response, "other (per game)");

    if (scorecardNumber === "one") {
      playerMatches1.innerHTML = matchesStats.matches_total;
      playerGoals1.innerHTML = attackingStats.goals;
      playerAssists1.innerHTML = pasingStats.assists;
      playerTouches1.innerHTML = pasingStats.touches;
      playerBigChances1.innerHTML = pasingStats.big_chance_created;
      playerDribbles1.innerHTML = otherStats.successful_dribbles_per_game.slice(
        0,
        3
      );

      rate1.innerHTML = "pass rate";
      playerGoalConversion1.innerHTML =
        pasingStats.accurate_passes_per_game.slice(6, 9);

      shots1.innerHTML = "ball lost";
      playerDualsWon1.innerHTML = otherStats.possession_lost;
    } else if (scorecardNumber === "two") {
      playerMatches2.innerHTML = matchesStats.matches_total;
      playerGoals2.innerHTML = attackingStats.goals;
      playerAssists2.innerHTML = pasingStats.assists;
      playerTouches2.innerHTML = pasingStats.touches;
      playerBigChances2.innerHTML = pasingStats.big_chance_created;
      playerDribbles2.innerHTML = otherStats.successful_dribbles_per_game.slice(
        0,
        3
      );

      rate2.innerHTML = "pass rate";
      playerGoalConversion2.innerHTML =
        pasingStats.accurate_passes_per_game.slice(6, 9);

      shots2.innerHTML = "ball lost";
      playerDualsWon2.innerHTML = otherStats.possession_lost;
    }
  });
};

const getDefenderStats = function (id, apikey, scorecardNumber) {
  const stats = getAllStats(id, apikey);
  stats.then((response) => {
    const matchesStats = getStatsFromFieldName(response, "matches");
    const attackingStats = getStatsFromFieldName(response, "attacking");
    const defendingStats = getStatsFromFieldName(response, "defending");
    const pasingStats = getStatsFromFieldName(response, "passes");
    const foulStats = getStatsFromFieldName(response, "cards");
    const otherStats = getStatsFromFieldName(response, "other (per game)");

    if (scorecardNumber === "one") {
      playerMatches1.innerHTML = matchesStats.matches_total;
      playerGoals1.innerHTML = attackingStats.goals;
      playerAssists1.innerHTML = pasingStats.assists;

      rate1.innerHTML = "duels won";
      playerGoalConversion1.innerHTML = otherStats.duels_won_per_game.slice(
        0,
        3
      );

      touches1.innerHTML = "intercepts";
      playerTouches1.innerHTML = defendingStats.interceptions_per_game;

      shots1.innerHTML = "clearances";
      playerDualsWon1.innerHTML = defendingStats.total_clearances_per_game;

      chances1.innerHTML = "ball lost";
      playerBigChances1.innerHTML = otherStats.possession_lost;

      dribbles1.innerHTML = "errors";
      playerDribbles1.innerHTML = defendingStats.error_lead_toa_goal;
    } else if (scorecardNumber === "two") {
      playerMatches2.innerHTML = matchesStats.matches_total;
      playerGoals2.innerHTML = attackingStats.goals;
      playerAssists2.innerHTML = pasingStats.assists;

      rate2.innerHTML = "duels won";
      playerGoalConversion2.innerHTML = otherStats.duels_won_per_game.slice(
        0,
        3
      );

      touches2.innerHTML = "intercepts";
      playerTouches2.innerHTML = defendingStats.interceptions_per_game;

      shots2.innerHTML = "clearances";
      playerDualsWon2.innerHTML = defendingStats.total_clearances_per_game;

      chances2.innerHTML = "ball lost";
      playerBigChances2.innerHTML = otherStats.possession_lost;

      dribbles2.innerHTML = "errors";
      playerDribbles2.innerHTML = defendingStats.error_lead_toa_goal;
    }
  });
};

const getGoalieStats = function (id, apikey, scorecardNumber) {
  const stats = getAllStats(id, apikey);
  stats.then((response) => {
    const matchesStats = getStatsFromFieldName(response, "matches");
    const goalKeepingStats = getStatsFromFieldName(response, "goalkeeping");
    const attackingStats = getStatsFromFieldName(response, "attacking");
    const defendingStats = getStatsFromFieldName(response, "defending");
    const pasingStats = getStatsFromFieldName(response, "passes");
    const foulStats = getStatsFromFieldName(response, "cards");
    const otherStats = getStatsFromFieldName(response, "other (per game)");

    if (scorecardNumber === "one") {
      playerMatches.innerHTML = matchesStats.matches_total;

      goals.innerHTML = "clean sheet";
      playerGoals.innerHTML = defendingStats.clean_sheets;

      assists.innerHTML = "saves";
      playerAssists.innerHTML = goalKeepingStats.more.total_saves;

      rate.innerHTML = "conceded";
      playerGoalConversion.innerHTML = goalKeepingStats.more.goals_conceded;

      touches.innerHTML = "errors";
      playerTouches.innerHTML = defendingStats.error_lead_toa_goal;

      shots.innerHTML = "touches";
      playerDualsWon.innerHTML = pasingStats.touches;

      chances.innerHTML = "ball lost";
      playerBigChances.innerHTML = otherStats.possession_lost;

      dribbles.innerHTML = "duels won";
      playerDribbles.innerHTML = otherStats.aerial_duels_won_per_game.slice(
        5,
        8
      );
    } else if (scorecardNumber === "two") {
      playerMatches2.innerHTML = matchesStats.matches_total;

      goals2.innerHTML = "clean sheet";
      playerGoals2.innerHTML = defendingStats.clean_sheets;

      assists2.innerHTML = "saves";
      playerAssists2.innerHTML = goalKeepingStats.more.total_saves;

      rate2.innerHTML = "conceded";
      playerGoalConversion2.innerHTML = goalKeepingStats.more.goals_conceded;

      touches2.innerHTML = "errors";
      playerTouches2.innerHTML = defendingStats.error_lead_toa_goal;

      shots2.innerHTML = "touches";
      playerDualsWon2.innerHTML = pasingStats.touches;

      chances2.innerHTML = "ball lost";
      playerBigChances2.innerHTML = otherStats.possession_lost;

      dribbles2.innerHTML = "duels won";
      playerDribbles2.innerHTML = otherStats.aerial_duels_won_per_game.slice(
        5,
        8
      );
    }
  });
};

const getDesiredPlayer = function (desiredPlayerName, scorecardNumber) {
  fetch(
    "https://sportscore1.p.rapidapi.com/players/search?locale=en&name=" +
      desiredPlayerName,
    {
      method: "POST",
      headers: {
        "x-rapidapi-host": "sportscore1.p.rapidapi.com",
        "x-rapidapi-key": API_KEY,
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
        getStrikerStats(id, API_KEY, scorecardNumber);
        name,
          updatePlayerDetails(
            name,
            photo,
            playerPos,
            shirt_number,
            scorecardNumber
          );
        getPlayersClubFromId(id, scorecardNumber);
      } else if (position_name.toLowerCase() == "midfielder") {
        getMidfielderStats(id, API_KEY, scorecardNumber);
        updatePlayerDetails(
          name,
          photo,
          playerPos,
          shirt_number,
          scorecardNumber
        );
        getPlayersClubFromId(id, scorecardNumber);
      } else if (position_name.toLowerCase() == "defender") {
        getDefenderStats(id, API_KEY, scorecardNumber);
        updatePlayerDetails(
          name,
          photo,
          playerPos,
          shirt_number,
          scorecardNumber
        );
        getPlayersClubFromId(id, scorecardNumber);
      } else {
        getGoalieStats(id, API_KEY, scorecardNumber);
        updatePlayerDetails(
          name,
          photo,
          playerPos,
          shirt_number,
          scorecardNumber
        );
        getPlayersClubFromId(id, scorecardNumber);
      }

      // getPlayerClub(id);
      // getPlayerStat(id);
    })
    .catch((err) => {
      console.error(err);
    });
};

const getPlayersClubFromId = async function (playerId, scorecardNumber) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "sportscore1.p.rapidapi.com",
      "X-RapidAPI-Key": API_KEY,
    },
  };

  const response = await fetch(
    "https://sportscore1.p.rapidapi.com/players/" + playerId + "/teams?page=1",
    options
  );
  const result = await response.json();
  const { data } = result;
  if (scorecardNumber === "one") {
    playerClub1.src = data[0].logo;
  } else if (scorecardNumber === "two") {
    playerClub2.src = data[0].logo;
  }

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
