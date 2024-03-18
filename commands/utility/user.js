const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Provide informations about the user"),
  async execute(interaction) {
    await interaction.replay(
      `This server is ${interaction.user.name} and has join ${interaction.member.joinedAt}.`,
    );
  },
};
