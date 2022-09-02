const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
module.exports = {
	data: new SlashCommandBuilder()
	.setName("button")
	.setDescription(`Button Test`),
	run: async (client, interaction) => {

		const tweetEmbed = new EmbedBuilder()
        .setTitle("Follow @Toximay on Twitter!")
        .setColor('Blue')
        .setFooter( {text: "or else..."} )

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setLabel("Click Here!")
                .setStyle(ButtonStyle.Link)
                .setURL("https://twitter.com/toximay")
            )

        interaction.reply({ embeds: [tweetEmbed], ephemeral: true, components: [row]})
	},
};