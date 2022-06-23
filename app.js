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
const playerGoalConversion = document.querySelector(".player-goal-conversion");
const playerTouches = document.querySelector(".player-touches");
const playerBigChances = document.querySelector(".player-big-chances");
const playerDualsWon = document.querySelector(".player-duals-won");
const playerDribbles = document.querySelector(".player-dribbles");

const goals = document.querySelector(".goals");
const assists = document.querySelector(".assists");
const rate = document.querySelector(".rate");
const touches = document.querySelector(".touches");
const shots = document.querySelector(".shots");
const chances = document.querySelector(".chances");
const dribbles = document.querySelector(".dribbles");

const searchBoxOne = document.querySelector(".search-box-1");
const searchBoxTwo = document.querySelector(".search-box-2");

const btn = document.querySelector(".search-icon-1");

btn.addEventListener("click", function (e) {
  getDesiredPlayer(searchBoxOne.value.toLowerCase());
  searchBoxOne.value = "";
  const displayeMessage = setTimeout(function () {
    document
      .querySelector(".scorecard-one")
      .classList.remove("scorecard-one-invisible");
  }, 4000);
  // clearTimeout(displayeMessage);
  // document.querySelector(".scorecard-one").classList.remove("scorecard-one-invisible");
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
    playerGoalConversion.innerHTML = attackingStats.more.goal_conversion;
    playerTouches.innerHTML = pasingStats.touches;
    playerBigChances.innerHTML = pasingStats.big_chance_created;
    playerDualsWon.innerHTML = attackingStats.total_shots_per_game;
    playerDribbles.innerHTML = otherStats.successful_dribbles_per_game.slice(
      0,
      3
    );
  });
};

// getStrikerStats();

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
    playerTouches.innerHTML = pasingStats.touches;
    playerBigChances.innerHTML = pasingStats.big_chance_created;
    playerDribbles.innerHTML = otherStats.successful_dribbles_per_game.slice(
      0,
      3
    );

    rate.innerHTML = "pass rate";
    playerGoalConversion.innerHTML = pasingStats.accurate_passes_per_game.slice(
      6,
      9
    );

    shots.innerHTML = "ball lost";
    playerDualsWon.innerHTML = otherStats.possession_lost;
  });
};

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

    rate.innerHTML = "duels won";
    playerGoalConversion.innerHTML = otherStats.duels_won_per_game.slice(0, 3);

    touches.innerHTML = "intercepts";
    playerTouches.innerHTML = defendingStats.interceptions_per_game;

    shots.innerHTML = "clearances";
    playerDualsWon.innerHTML = defendingStats.total_clearances_per_game;

    chances.innerHTML = "ball lost";
    playerBigChances.innerHTML = otherStats.possession_lost;

    dribbles.innerHTML = "errors";
    playerDribbles.innerHTML = defendingStats.error_lead_toa_goal;
  });
};

// getDefenderStats();

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
    playerDribbles.innerHTML = otherStats.aerial_duels_won_per_game.slice(5, 8);

    //console.log(goalKeepingStats);
    //console.log(otherStats);
    //console.log(matchesStats);
    //console.log(pasingStats);
    //console.log(defendingStats);
    //console.log(goalKeepingStats.group_name);
  });
};

// getGoalieStats(73111, apiKEY);

// const desiredPlayerName = "lionel messi";
// const desiredPlayerName = "mason mount";
// const desiredPlayerName = "thiago silva";

// const desiredPlayerName = "edouard mendy";

// console.log(getAllStats(73111, apiKEY));

const getDesiredPlayer = function (desiredPlayerName) {
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

// getDesiredPlayer("lionel messi");

const getPlayersClubFromId = async function (playerId) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "sportscore1.p.rapidapi.com",
      "X-RapidAPI-Key": apiKey,
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
