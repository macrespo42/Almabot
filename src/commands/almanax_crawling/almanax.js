const { SlashCommandBuilder } = require("discord.js");
const almanaxOfferings = require("../../../almanaxDB.json");

function getTodayAlmanax() {
  const today = new Date();
  const todayOffering =
    almanaxOfferings[
      `${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`
    ];
  return `${todayOffering.bonusType}\n${todayOffering.bonus}\n${todayOffering?.img} ${todayOffering.offering}`;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("almanax")
    .setDescription("Get the almanax of the day"),
  async execute(interaction) {
    await interaction.reply(getTodayAlmanax());
  },
};
