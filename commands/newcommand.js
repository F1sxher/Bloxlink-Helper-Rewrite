const { Command } = require('discord-akairo');

class newcommand extends Command {
    constructor() {
        super('newcommand', {
           aliases: ['newcommand'] 
        });
    }

    exec(message) {
        return message.channel.send(`<@${message.author.id}> Pong!`);
    }
}

module.exports = newcommand;