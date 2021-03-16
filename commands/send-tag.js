const { Command } = require('discord-akairo');

// This commands calls tags.

class sendtagCommand extends Command {
    constructor() {
        super('send-tag', {
           aliases: ['send-tag'],
           description: {
            content: 'Calls tags',
            usage: 'tag <name>',
        },
        });
    }

    async exec(message) {
        const args = message.content.slice(process.env.prefix.length).split(' ');
        console.log(args)
        if (args[1] === undefined) {
            return message.channel.send('You have to say what tag you need!')
        }
        let tag = await this.client.tagdb.findOne({where: {name: args[1]}})
        if (!tag) {
            try {message.delete({timeout: 1500})} catch(e) {}
            let msg = await message.channel.send('That tag doesn\'t exist!')
            return msg.delete({timeout: 1500})
        }
        message.delete()
        return message.channel.send(tag.text);
    }
}

module.exports = sendtagCommand;