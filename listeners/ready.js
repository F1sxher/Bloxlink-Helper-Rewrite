const { Listener } = require('discord-akairo');

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    exec() {
        this.client.user.setActivity('Bloxlink RAP', { type: 'LISTENING' } )
    }
}

module.exports = ReadyListener;