const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const Discord = require('discord.js');

class APICommand extends Command {
    constructor() {
        super('api', {
           aliases: ['api'],
           description: {
            content: 'Make a call to the Bloxlink API and return the JSON.',
            usage: 'api <user id>'
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

    async exec(message, args) {
        let url = `https://api.blox.link/v1/user/${args.userID.id}` // Get url from command arguments.
        let response = await fetch(url); // Send a GET request to the url
        response = await response.json(); // Turns the response into
        response = await JSON.stringify(response); // Turn the JSON into a string so you can send it in a Discord message. Don't do this if you are not sending the whole JSON output as a string.
        // Below is sending the output
        let embed = new Discord.MessageEmbed();
        embed.setColor(0x3bff38);
        embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
        embed.setDescription(`Sent a request to ${url}.`);
        embed.addField('Response', '```json\n' + response + '```');
        return message.channel.send(embed);
    }
}

module.exports = APICommand;
// module.exports = class APICommand extends Command {}    