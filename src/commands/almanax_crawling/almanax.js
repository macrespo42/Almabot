const { SlashCommandBuilder } = require("discord.js");

function getTodayAlmanax() {
  return "Sauge";
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("almanax")
    .setDescription("Get the almanax of the day"),
  async execute(interaction) {
    await interaction.reply(getTodayAlmanax());
  },
};
