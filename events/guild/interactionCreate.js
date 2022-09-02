const discord = require('discord.js');

module.exports = {
	name: "interactionCreate",
	run: async (client, interaction) => {

		const command = client.slashCommands.get(interaction.commandName)
	
		if(!interaction.isChatInputCommand()) return;
		if(!command) return;

		try {
			await command.run(client, interaction)
		} catch (error) {
			await interaction.reply({ content: "There was an error while running this command"})
			console.log(error)
		}
	},
};