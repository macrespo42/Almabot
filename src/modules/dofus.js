const almanaxOfferings = require("../../almanaxDB.json");

const getAlmanax = (day, month) => {
  const offering =
    almanaxOfferings[
      `${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`
    ];

  return offering;
};

module.exports = {
  getAlmanax,
};
