const { Command } = require('discord-akairo');

class PingCommand extends Command {
    constructor() {
        super('ping', {
           aliases: ['ping'] 
        });
    }

    async exec(message) {
        let msg = await message.channel.send('Pinging...');
        console.log(this.handler.modules)
        return msg.edit(`Pong!\nLatency: \`${msg.createdTimestamp - message.createdTimestamp}ms\`\nAPI Latency: \`${Math.round(this.client.ws.ping)}ms\``);
    }
}

module.exports = PingCommand;