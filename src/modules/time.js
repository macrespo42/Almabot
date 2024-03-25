const getYesterday = (today) => {
  let yesterday = new Date(today.getTime());
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday;
};

const getTomorrow = (today) => {
  let yesterday = new Date(today.getTime());
  yesterday.setDate(yesterday.getDate() + 1);
  return yesterday;
};

const getFirsDayOfTheWeek = (today) => {
  while (today.getDay() !== 1) {
    today = getYesterday(today);
  }
  return today;
};

module.exports = {
  getTomorrow,
  getFirsDayOfTheWeek,
};
