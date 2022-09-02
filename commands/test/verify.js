const { SlashCommandBuilder } = require("discord.js");
const { default: fetch } = require("node-fetch");
const noblox = require('noblox.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("verify")
    .setDescription(`ROBLOX Verification`)
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to verify")
    ),
  run: async (client, interaction) => {
    var user;

    if (interaction.options.getUser("user")) {
      user = interaction.options.getUser("user")
    } else {
      user = interaction.user
    }

    const member = interaction.guild.members.cache.get(user.id)

    var data = await fetch(`https://verify.eryn.io/api/user/${user.id}`)
    data = await data.json()

      if(data.status == 'ok') {

        noblox.getPlayerInfo(data.robloxId)
        .then(playerData => {
          interaction.reply({ content: `Successfully verified as: **${data.robloxUsername}**`})
            member.setNickname(`${playerData.displayName} (@${data.robloxUsername})`)
        })

      } else {
        switch (data.errorCode) {
          case 404:
            interaction.reply({ content: `No account associated with your discord ID, please verify [here](https://rover.link/verify)`})
              break;

          case 429:
            interaction.reply({ content: `The API is currently receiving too many requests from various clients, please retry after **${data.retryAfterSeconds}** seconds`})
              break;
          default:
            interaction.reply({ content: `**${data.errorCode} Error**\nPlease try again, if the error persists, contact server administrator`})

      }
      }
  },
};
