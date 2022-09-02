const {Collection, Client, GatewayIntentBits, Partials} = require('discord.js');
const fs = require('fs');
const config = require('./config.json')

const client = new Client({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel]})

client.slashCommands = new Collection();
client.events = new Collection();
client.config = config;
client.categories = fs.readdirSync('./commands/');
['command', 'event'].forEach(handler => {
    require(`./handler/${handler}`)(client);
});

client.login(config.TOKEN)