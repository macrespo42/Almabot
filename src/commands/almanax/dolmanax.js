const { SlashCommandBuilder } = require("discord.js");

const MONTHS = [
  "Janvier",
  "Fevrier",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Aout",
  "Septembre",
  "Octobre",
  "Novembre",
  "Decembre",
];
const DAYS = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dolmanax")
    .setDescription("Gives you the date you obtained your precious Dolmanax.")
    .addIntegerOption((option) =>
      option
        .setName("pages")
        .setDescription("Number of calendar pages")
        .setRequired(true),
    ),
  async execute(interaction) {
    const obtainingDate = new Date();
    obtainingDate.setDate(
      obtainingDate.getDate() +
        (365 - interaction.options.getInteger("pages") ?? 0),
    );
    const dateFormated = `${DAYS[obtainingDate.getDay()]} ${obtainingDate.getDate()} ${MONTHS[obtainingDate.getMonth()]} ${obtainingDate.getFullYear()}`;
    await interaction.reply(
      `Hey ${interaction.user.username} si tu es sage tu obtiendra ton dolmanax le ${dateFormated}!`,
    );
  },
};
