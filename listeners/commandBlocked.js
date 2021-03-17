const { Listener } = require('discord-akairo');

class commandBlockedListener extends Listener {
    constructor() {
        super('commandBlocked', {
            emitter: 'commandHandler',
            event: 'commandBlocked'
        });
    }

    async exec(message, command, channel, author) {
        message.channel.send(`This command can only be used in a ${channel.toUpperCase()}.`)
        
        // Experimental Code 
       console.log(message.author.id)
        const args = message.content.slice(process.env.prefix.length).split(' ');
        message.content = args.splice(0).join(" ");
        // message.channel = 'dm'
        message.author = message.author
        return this.client.emit("message", message);
    }
}

module.exports = commandBlockedListener;