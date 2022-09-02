const { SlashCommandBuilder } = require("discord.js");
const ms = require("ms");

module.exports = {
	data: new SlashCommandBuilder()
	.setName("fizz")
	.setDescription(`Returns "Buzz"`),
	run: async (client, interaction) => {

		interaction.reply({ content: "Testing\n*-buzz*", ephemeral: true})
	},
};
