const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const almanaxOfferings = require("../../../almanaxDB.json");

function getTodayAlmanax(day, month) {
  const todayOffering =
    almanaxOfferings[
      `${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`
    ];
  const offeringEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(todayOffering?.bonusType ?? null)
    .setDescription(todayOffering?.bonus ?? null)
    .setThumbnail(todayOffering?.img ?? null)
    .setImage(todayOffering?.img ?? null)
    .addFields({
      name: "Offrande:",
      value: todayOffering?.offering ?? "Invalid date",
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
    await interaction.reply({ embeds: [getTodayAlmanax(day, month)] });
  },
};
