const { Listener } = require('discord-akairo');

class commandBlockedListener extends Listener {
    constructor() {
        super('commandBlocked', {
            emitter: 'commandHandler',
            event: 'commandBlocked'
        });
    }

    exec(message, command, reason) {
        message.channel.send(`This command can only be used in a ${reason.toUpperCase()}.`)
    }
}

module.exports = commandBlockedListener;