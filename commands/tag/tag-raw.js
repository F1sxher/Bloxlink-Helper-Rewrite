const { Command } = require('discord-akairo');

// This commands calls tags raw.

class tagRawCommand extends Command {
    constructor() {
        super('tag-raw', {
        //    aliases: ['tag-raw'],
           description: {
            content: 'Calls raw tags',
            usage: 'tag-raw <name>',
        },
        });
    }

    async exec(message) {
        const args = message.content.slice(process.env.prefix.length).split(' ');
        if (args[1] === undefined) {
            return message.channel.send('You have to say what tag you need!')
        }
        let tag = await this.client.tagdb.findOne({where: {name: args[1]}})
        if (!tag) {
        tag = await this.client.tagdb.findOne({where: {aliases: args[1]}})
        if (!tag) {
            try {message.delete({timeout: 1500})} catch(e) {}
            let msg = await message.channel.send('That tag doesn\'t exist!')
            return msg.delete({timeout: 1500}) 
        }

        }
        message.delete()
        tag.increment("uses");
        return message.channel.send(`__Raw Tag:__ **${tag.name}**\n \n\`\`\`${tag.text}\`\`\``);
    }
}

module.exports = tagRawCommand;
