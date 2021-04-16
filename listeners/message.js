const { Listener } = require('discord-akairo');
const Settings = require('../cmdSettings.js')

class MessageListener extends Listener {
    constructor() {
        super('message', {
            emitter: 'client',
            event: 'message'
        });
    }

    exec(message) {
        if((message.content.startsWith(Settings.prefixes[0]) || message.content.startsWith(Settings.prefixes[1])) || message.content.startsWith(Settings.prefixes[2])){
          if(!message.member.roles.cache.some(role => Settings.roleExceptions.includes(role.id))){
            if(!Settings.channelExceptions.includes(message.channel.id)){
              message.channel.send('<:BloxlinkDead:823633973967716363> Commands can only be ran in <#372181138002935819>')
            }
          }
        }
    }
}

module.exports = MessageListener;