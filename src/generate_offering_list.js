const fs = require("node:fs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { EN_MONTHS } = require("./modules/constants.js");

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
  const year = new Date().getFullYear();

  for (let day = 1; day < 32; day++) {
    const date = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
    const query = `https://www.krosmoz.com/fr/almanax/${date}${day === 31 && month === 3 ? "-pwak" : ""}`;
    if (day === 31 && month === 3) {
      console.log("PWAK", query);
    }
    const response = await fetch(query, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36",
      },
    });

    if (response.status === 404) {
      break;
    } else {
      console.log(`OK`);
    }
    const html = await response.text();

    monthOfferings[date.slice(5)] = getOfferingDatas(html);
  }

  console.log(`${EN_MONTHS[month - 1]} done ✅`);
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
      console.log("Offering db is ready! 🎉");
    });
}
