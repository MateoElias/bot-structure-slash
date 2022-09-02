const { readdirSync } = require("fs");
const { Routes } = require("discord.js");
const { REST } = require("@discordjs/rest");
const chalk = require("chalk");
const config = require("../config.json");
module.exports = (client) => {

  const slashCommands = []

  readdirSync("./commands/").map((dir) => {
    console.log(

      `${chalk.bold.yellow(
        `\nNow loading commands from: ${chalk.bold.green(dir.toUpperCase())}/`
      )}`
    );

    const commands = readdirSync(`./commands/${dir}/`).map((cmd) => {
      let command = require(`../commands/${dir}/${cmd}`);

      //  Loading commands into the Collection "slashCommands"
      try {
        client.slashCommands.set(command.data.name, command); // Load Command into collection
        slashCommands.push(command.data.toJSON())

        console.log(
          `Loaded command: ${chalk.green(cmd)} ${chalk.blue(
            "|"
          )} ${chalk.italic(command.data.name)}`
        );

      } catch (error) {
        console.log(
          `Unable to load ${chalk.red(cmd)} ${chalk.blue(
            "|"
          )} ${chalk.italic.redBright(`\n${error}`)}`
        );
      }
    });
  });

  const rest = new REST({ version: '10' }).setToken(config.TOKEN);
    
  (async () => {
    try {
        console.log(chalk.bold.yellow("\nStarted refreshing application (/) commands..."))
    
        await rest.put(
          Routes.applicationGuildCommands(config.ID, config.G_ID),
          { body: slashCommands}
        )
        console.log(chalk.green("Successfully reloaded application (/) commands."))
      } catch (error) {
      console.log(chalk.bold.redBright("There has been an error while refreshing commands\n" + error))
    }
  })();
};
