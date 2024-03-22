const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const almanaxOfferings = require("../../../almanaxDB.json");

function getTodayAlmanax() {
  const today = new Date();
  const todayOffering =
    almanaxOfferings[
      `${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`
    ];
  const offeringEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(todayOffering.bonusType)
    .setDescription(todayOffering.bonus)
    .setThumbnail(todayOffering?.img)
    .addFields({ name: "Offrande:", value: todayOffering.offering });
  return offeringEmbed;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("almanax")
    .setDescription("Get the almanax of the day"),
  async execute(interaction) {
    await interaction.reply({ embeds: [getTodayAlmanax()] });
  },
};
