const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getAlmaNextWeek } = require("../../modules/dofus");

function formatResponse(offering) {
  const offeringEmbed = new EmbedBuilder()
    .setColor(0xbacd47)
    .setTitle(offering?.day ?? null)
    .setThumbnail(offering?.img ?? null)
    .setImage(offering?.img ?? null)
    .addFields(
      {
        name: offering?.bonusType ?? "Bonus type not found",
        value: offering?.bonus ?? "Bonus not found",
      },
      {
        name: "Offrande:",
        value: offering?.offering ?? "Invalid date",
      },
    );
  return offeringEmbed;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("almanextweek")
    .setDescription("get almanax for the whole next week"),
  async execute(interaction) {
    const almaweek = getAlmaNextWeek();
    const embededs = [];
    for (const day of almaweek) {
      embededs.push(formatResponse(day));
    }
    await interaction.reply({
      embeds: [...embededs],
    });
  },
};
