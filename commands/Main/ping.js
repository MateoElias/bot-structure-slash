const Discord = require("discord.js");
const ms = require("ms");
const { SlashCommandBuilder } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
	.setName("ping")
	.setDescription("Returns ping and Uptime"),
	run: async (client, interaction) => {

		const ping = new Discord.EmbedBuilder()
		.setColor('White')
		.setDescription(`My ping is **${Math.round(client.ws.ping)}**ms`)
		.setFooter({ text:`Uptime: ${ms(client.uptime, { long: true })}` })

		interaction.reply({
			embeds: [ping],
		});
	},
};
