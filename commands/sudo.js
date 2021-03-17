const { Command } = require('discord-akairo');

class sudocommand extends Command {
    constructor() {
        super('sudo', {
           aliases: ['sudo'],
           ownerOnly: true
        });
    }

    async exec(message) {
    const args = message.content.slice(process.env.prefix.length).split(' ');
    message.content = args.splice(2).join(" ");
    message.author = await this.client.users.fetch(args[1])
    this.client.emit("message", message);
}
}

module.exports = sudocommand;