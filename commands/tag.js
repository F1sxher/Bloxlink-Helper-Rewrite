const { Command, Flag } = require('discord-akairo');

class tag extends Command {
    constructor() {
        super('tag', {
           aliases: ['tag'],
           *args() {
            const method = yield {
                type: [
                  // [module-id, alias1, alias2...]
                  ['tag-delete', 'delete'],
                  ['tag-info', 'info'],
                  ['tag-edit', 'edit'],
                  ['old-tag', 'oldtag']
                ],
                // otherwise: Flag.continue(method.oldtagCommand),
                // otherwise: `Use ${process.env.prefix}`
                // otherwise: () => file(old-tag.js)
                default: 'old-tag',
                
              };
              console.log(method + 'hello world')
              return Flag.continue(method);
           }
        });

    }
    
}

module.exports = tag