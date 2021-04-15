const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const Discord = require('discord.js');

class assetAPICommand extends Command {
    constructor() {
        super('asset', {
           aliases: ['asset', 'assetapi'],
           description: {
            content: 'Make a call to the Roblox Asset Api and return the response.',
            usage: 'asset <asset id> <user id>',
            
        },
        channel: 'guild',
            args: [
                {
                    id: 'assetID',
                    type: 'string',
                    prompt: {
                        start: 'Please provide an asset ID.',
                        // retry: 'That is not vaild user! Please provide a user ID or a mention.'
                    }
                },
                {
                    id: 'userID',
                    type: 'string',
                    prompt: {
                        start: 'Please provide a user ID.',
                        // retry: 'That is not vaild user! Please provide a user ID or a mention.'
                    }
                },
            ]

        });
    }

    async exec(message, args) {
        let url = `https://api.roblox.com/ownership/hasasset?assetId=${args.assetID}&userId=${args.userID}` // Get url from command arguments.
        let response = await fetch(url); // Send a GET request to the URL
        response = await response.json()
        response = await JSON.stringify(response)
        let embed = new Discord.MessageEmbed();
        embed.setColor(0x3bff38);
        embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
        embed.setDescription(`Sent a request to ${url}.`);
        embed.addField('Response', '```xl\n' + response + '```');
        return message.channel.send(embed);
    }
}

module.exports = assetAPICommand;
// module.exports = class APICommand extends Command {}    
