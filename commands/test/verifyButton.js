const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
module.exports = {
	data: new SlashCommandBuilder()
	.setName("verifybutton")
	.setDescription(`Button Test 2`),
	run: async (client, interaction) => {

		const tweetEmbed = new EmbedBuilder()
        .setTitle("Click on the Button to Verify")
        .setColor('Red')
        .setFooter( {text: "If it works, that is"} )

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setLabel("Click Here!")
                .setStyle(ButtonStyle.Success)
                .setCustomId('verify')
            )

        interaction.reply({ embeds: [tweetEmbed], components: [row]})
	},
};