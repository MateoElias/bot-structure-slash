const chalk = require("chalk");

module.exports = {
	name: "error",
	run: async (client, error) => {
		console.log(chalk.redBright.bold("There has been an error :(\n" + error))
	},
};
