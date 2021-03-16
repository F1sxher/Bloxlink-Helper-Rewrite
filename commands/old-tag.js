const { Command } = require('discord-akairo');

// This commands calls tags.

class oldtagCommand extends Command {
    constructor() {
        super('old-tag', {
           aliases: ['old-tag'],
           description: {
            content: 'Calls tags',
            usage: 'tag <name>',
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
        console.log(args)
        // if (!args.tagOption) {
        //     // letmessage.split(' ')
        //     // return console.log(message)
        //     // args.tagOption = 'usesupport2'
        //     console.log(message.content)
            
        // }
        const tagOption = message.content.slice(process.env.prefix.length).split(' ');
        let tag = await this.client.tagdb.findOne({where: {name: tagOption}})
        if (!tag) {
            try {message.delete({timeout: 1500})} catch(e) {}
            let msg = await message.channel.send('That tag doesn\'t exist!')
            return msg.delete({timeout: 1500})
        }
        message.delete()
        return message.channel.send(tag.text);
    }
}

module.exports = oldtagCommand;