const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
	.setName("refresh")
	.setDescription(`Refresh Command List`),
	run: async (client, interaction) => {

		console.log(await interaction.member.guild.commands)
	},
};