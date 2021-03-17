const { Command } = require('discord-akairo');

class tagcreateCommand extends Command {
    constructor() {
        super('tag-create', {
        //    aliases: ['tag-create'],
           description: {
            content: 'Creates tags',
            usage: 'tag create <name>',
        },
        args: [
            {
                id: 'userID',
                type: 'string', // was user
                prompt: {
                    start: 'Please provide a user ID or a mention.',
                    // retry: 'That is not vaild user! Please provide a user ID or a mention.'
                }
            },
            {
                id: 'guildID',
                type: 'guild',
                optional: 'true',
            }
        ]
        });
    }

    async exec(message) {
        const args = message.content.slice(process.env.prefix.length).split(' ');
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

module.exports = tagcreateCommand;