/**
 * Register commands into the selected guild
 * @param {String} clientID 
 * @param {String} guildID 
 * @param {Array} commands The commands to register (IN JSON)
 */

async function register(clientID, guildID, commands){
    try {
        console.log(chalk.bold.yellow("\nStarted refreshing application (/) commands..."))
    
        await rest.put(
          Routes.applicationGuildCommands(clientID, guildID),
          { body: commands}
        )
        console.log(chalk.green("Successfully reloaded application (/) commands."))
      } catch (error) {
      console.log(chalk.bold.redBright("There has been an error while refreshing commands\n" + error))
    }
}

exports.register = register;