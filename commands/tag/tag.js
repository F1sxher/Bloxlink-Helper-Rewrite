const { Command, Flag } = require('discord-akairo');

class tag extends Command {
    constructor() {
        super('tag', {
           aliases: ['tag'],
           channel: 'guild',
           *args() {
            const method = yield {
                type: [
                  // [module-id, alias1, alias2...]
                  ['tag-delete', 'delete'],
                  ['tag-info', 'info'],
                  ['tag-edit', 'edit'],
                  ['tag-send', 'send'],
                  ['tag-raw', 'raw'],
                ],
                default: 'tag-send',
              };
              return Flag.continue(method);
           }
        });

    }
    
}

module.exports = tag
