const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getAlmanax } = require("../../modules/dofus");
const { getTomorrow } = require("../../modules/time");

function formatResponse(offering) {
  const offeringEmbed = new EmbedBuilder()
    .setColor(0xbacd47)
    .setTitle(offering?.bonusType ?? null)
    .setDescription(offering?.bonus ?? null)
    .setThumbnail(offering?.img ?? null)
    .setImage(offering?.img ?? null)
    .addFields({
      name: "Offrande:",
      value: offering?.offering ?? "Invalid date",
    });
  return offeringEmbed;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("almatomorow")
    .setDescription("Get the next almanax"),
  async execute(interaction) {
    const today = new Date();
    const tomorow = getTomorrow(today);
    await interaction.reply({
      embeds: [
        formatResponse(getAlmanax(tomorow.getDate(), tomorow.getMonth() + 1)),
      ],
    });
  },
};
