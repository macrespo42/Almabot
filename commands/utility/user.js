const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Provide informations about the user"),
  async execute(interaction) {
    await interaction.reply(
      `This server is ${interaction.user.username} and has join ${interaction.member.joinedAt}.`,
    );
  },
};
