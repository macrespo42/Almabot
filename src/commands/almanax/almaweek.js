const { SlashCommandBuilder } = require("discord.js");
const { getAlmanax } = require("../../modules/dofus");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("almaweek")
    .setDescription("get almanax for the whole week"),
  async execute(interaction) {
    await interaction.reply(`Today offering: ${getAlmanax(28, 7).offering}`);
  },
};
