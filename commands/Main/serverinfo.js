const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
	.setName("serverinfo")
	.setDescription(`Testing`),
	run: async (client, interaction) => {

		interaction.reply({ content: "New commands soon!", ephemeral: true})
	},
};