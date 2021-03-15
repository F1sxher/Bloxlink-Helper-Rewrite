const { Command } = require('discord-akairo');

class TagCommand extends Command {
    constructor() {
        super('tag', {
           aliases: ['tag'],
           description: {
            content: 'Manages and calls tags',
            usage: '<tag>'
        },
            args: [
                {
                    id: 'tagOption',
                    type: 'string',
                    // prompt: {
                    //     start: 'What is the name of the tag you wat ?',
                    //     retry: 'Uh. What?'
                    // }
                }
            ]

        });
    }

    async exec(message, args) {
        let tag = await this.client.tagdb.findOne({where: {name: args.tagOption}})
        if (!tag) {
            try {message.delete({timeout: 1500})} catch(e) {}
            let msg = await message.channel.send('That tag doesn\'t exist!')
            return msg.delete({timeout: 1500})
        }
        message.delete()
        let msg = await message.channel.send(tag.text);
        return msg.delete({timeout: 1500})
    }
}

module.exports = TagCommand;