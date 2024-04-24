const getYesterday = (today) => {
  let yesterday = new Date(today.getTime());
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday;
};

const getTomorrow = (today) => {
  let tomorrow = new Date(today.getTime());
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
};

const getFirsDayOfTheWeek = (today) => {
  while (today.getDay() !== 1) {
    today = getYesterday(today);
  }
  return today;
};

const getNextMonday = (today) => {
  while (today.getDay() !== 1) {
    today = getTomorrow(today);
  }
  return today;
};

module.exports = {
  getTomorrow,
  getFirsDayOfTheWeek,
  getNextMonday,
};
