const { Command } = require('discord-akairo');



class tagcreateCommand extends Command {
    constructor() {
        super('tag-info', {
        //    aliases: ['tag-info'],
           description: {
            content: 'Creates tags',
            usage: 'tag create <name>',
        },
        args: [
            {
                id: 'tagName',
                type: 'string', // was user
                prompt: {
                    start: 'Please provide a tag name!',
                    // retry: 'That is not vaild user! Please provide a user ID or a mention.'
                }
            },
        ]
        });
    }

    async exec(message, args) {
        // const args = message.content.slice(process.env.prefix.length).split(' ');
       console.log(args)
        let tag = await this.client.tagdb.findOne({where: {name: args.tagName}})
        if (!tag) {
            try {message.delete({timeout: 1500})} catch(e) {}
            let msg = await message.channel.send('That tag doesn\'t exist!')
            return msg.delete({timeout: 1500})
        }
        const embed = this.client.util.embed()
        embed.setTitle(`Tag Info: ${tag.name}`);
        embed.setDescription(
            `Created by: <@${tag.creatorid}>\nUses: ${tag.uses}\nAliases: \`${tag.aliases}\`\nCreated: ${tag.createdAt}\nUpdated: ${tag.updatedAt}`
          );
          embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
        return message.channel.send(embed);
    }
}

module.exports = tagcreateCommand;