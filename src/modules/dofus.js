const almanaxOfferings = require("../../almanaxDB.json");
const { getFirsDayOfTheWeek, getTomorrow } = require("./time");
const DAYS = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];

const getAlmanax = (day, month) => {
  const offering =
    almanaxOfferings[
      `${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`
    ];

  return offering;
};

const getAlmaweek = () => {
  const almaweek = [];
  const today = new Date();
  let monday = getFirsDayOfTheWeek(today);
  do {
    const almanax = getAlmanax(monday.getDate(), monday.getMonth() + 1);
    almanax.day = `${DAYS[monday.getDay()]}`;
    almaweek.push(almanax);
    monday = getTomorrow(monday);
  } while (monday.getDay() !== 1);
  return almaweek;
};

module.exports = {
  getAlmanax,
  getAlmaweek,
};
