const fs = require("node:fs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "august",
  "september",
  "october",
  "november",
  "december",
];

function getOfferingDatas(html) {
  const dom = new JSDOM(html);

  const offeringDiv = dom.window.document.querySelector("#achievement_dofus");
  const bonusDiv = offeringDiv.querySelector(".mid");
  const offeringInfos = bonusDiv.textContent.trim().split("\n");
  const img = offeringDiv
    .querySelector(".more-infos-content")
    .getElementsByTagName("img")[0]?.src;

  return {
    offering: offeringInfos[offeringInfos.length - 1].trim(),
    bonusType: offeringInfos[0].trim(),
    bonus: offeringInfos[1].trim(),
    img: img,
  };
}

async function getOfferingOfTheMonth(month) {
  let monthOfferings = {};
  const year = 2024;

  for (let day = 1; day < 31; day++) {
    const date = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
    const response = await fetch(`https://www.krosmoz.com/fr/almanax/${date}`, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36",
      },
    });

    if (response.status === 404) {
      break;
    } else {
      console.log(`${date}: ${response.status}`);
    }
    const html = await response.text();

    monthOfferings[date] = getOfferingDatas(html);
  }

  console.log(`${MONTHS[month - 1]} done ✅`);
  return monthOfferings;
}

let yearOfferings = {};

for (let month = 1; month <= 12; month++) {
  getOfferingOfTheMonth(month)
    .then((monthOfferings) => {
      yearOfferings = {
        ...yearOfferings,
        ...monthOfferings,
      };
    })
    .finally(() => {
      fs.writeFileSync("./almanaxDB.json", JSON.stringify(yearOfferings));
      console.log("Offering db is ready!");
    });
}
