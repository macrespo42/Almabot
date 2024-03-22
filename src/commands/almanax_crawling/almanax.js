const { SlashCommandBuilder } = require("discord.js");
const almanaxOfferings = require("../../../almanaxDB.json");

function getTodayAlmanax() {
  const today = new Date();
  console.log(
    `TODAY DATE:${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`,
  );
  const todayOffering =
    almanaxOfferings[
      `${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`
    ];
  return todayOffering.offering;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("almanax")
    .setDescription("Get the almanax of the day"),
  async execute(interaction) {
    await interaction.reply(getTodayAlmanax());
  },
};
