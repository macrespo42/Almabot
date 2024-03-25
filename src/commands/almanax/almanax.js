const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getAlmanax } = require("../../modules/dofus");

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
    .setName("almanax")
    .setDescription("Get the almanax of the day")
    .addIntegerOption((option) =>
      option.setName("day").setDescription("Day to get offering (Ex: 22)"),
    )
    .addIntegerOption((option) =>
      option.setName("month").setDescription("Month to get offering (Ex: 9)"),
    ),
  async execute(interaction) {
    const today = new Date();
    const day = interaction.options.getInteger("day") ?? today.getDate();
    const month =
      interaction.options.getInteger("month") ?? today.getMonth() + 1;
    await interaction.reply({
      embeds: [formatResponse(getAlmanax(day, month))],
    });
  },
};
