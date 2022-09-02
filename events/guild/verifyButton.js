const discord = require('discord.js');
const noblox = require('noblox.js')
const fetch = require('node-fetch')

module.exports = {
	name: "interactionCreate",
	run: async (client, interaction) => {

		if(!interaction.isButton()) return;

        const member = interaction.guild.members.cache.get(interaction.user.id)
        var embed = new discord.EmbedBuilder()

        var data = await fetch(`https://verify.eryn.io/api/user/${interaction.user.id}`)
        data = await data.json()

        if(data.status == 'ok') {

            const playerData = await noblox.getPlayerInfo(data.robloxId)
            embed.setColor('Green')
            .setTitle(`Welcome ${playerData.username}`)
            .setDescription(`Not your account? Re-Verify [Here](https://rover.link/verify)`)

            try{
              member.setNickname(`${playerData.displayName} (@${data.robloxUsername})`)
            } catch(error){
              interaction.followUp({ content: "There has been an error while updating your username, please ensure I have the proper permissions"})
            }
            
    
          } else {
            switch (data.errorCode) {
              case 404:
                embed.setColor('Red')
                embed.setTitle(`404 Error`)
                embed.setDescription("No account associated with your discord ID, please verify [here](https://rover.link/verify)")
                  break;
    
              case 429:
                embed.setColor('Red')
                embed.setTitle(`429 Error`)
                embed.setDescription(`The API is currently receiving too many requests from various clients, please retry after **${data.retryAfterSeconds}** seconds`)
                  break;

              default:
                embed.setColor('Red')
                embed.setTitle(`${data.errorCode} Error`)
                embed.setDescription("Please try again, if the error persists, contact server administrator")
          }
        }

        interaction.reply({ embeds: [embed], ephemeral: true})
	},
};