const { Command } = require('discord-akairo');
const Discord = require('discord.js')

class quote extends Command {
    constructor() {
        super('quote', {
           aliases: ['quote', 'quotemsg'],
           channel: 'guild',
            args: [
                {
                    id: 'messageId',
                    type: 'string',
                    prompt: {
                        start: 'Please provide a message ID.',
                        // retry: 'That is not vaild user! Please provide a user ID or a mention.'
                    }
                }
            ]
        })
    }

    exec(message, args) {
        let embed = new Discord.MessageEmbed();
        message.delete()

        function quote(msg, args, embed){
          embed.setColor(0x5271ff);
          embed.setAuthor(`${msg.author.username}#${msg.author.discriminator}`, `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}.png`);
          embed.setDescription(`[View Message](https://discord.com/channels/${msg.guild.id}/${msg.channel.id}/${args.messageId})`);
          embed.addField('Content', msg.content);
          message.channel.send(embed)
        }

        let msglnk;
        if(args.messageId.includes('discord.com' || args.messageId.includes('/channels'))){
          msglnk = args.messageId.split('channels')
          msglnk = msglnk[1].split('/')
          msglnk = msglnk[3]
          message.channel.messages.fetch(msglnk)
          .then(msg => quote(msg,args,embed))
        . catch(console.error);
        }else{ message.channel.messages.fetch(args.messageId)
        .then(msg => quote(msg,args,embed))
        .catch(console.error);
        }
    }
}

module.exports = quote;
