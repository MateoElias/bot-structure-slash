const {readdirSync} = require('fs')

module.exports=(client)=>{
    const load = dirs => {
        const events = readdirSync(`./events/${dirs}/`).filter(d => d.endsWith(".js"));
        for(let file of events){
            const event = require(`../events/${dirs}/${file}`);
            client.events.set(event.name, event)

            if(client.events.once) {
                client.once(event.name, event.run.bind(null, client)); 
            } else {
                client.on(event.name, event.run.bind(null, client));
            }
            
        };
    };
["client", "guild"].forEach(x=>load(x));

};