const { Command, Flag } = require('discord-akairo');

class subcommand extends Command {
    constructor() {
        super('subcommand', {
           aliases: ['subcommand'],
           *args() {
            const method = yield {
                type: [
                  // [module-id, alias1, alias2...]
                  ['tag', 'tag-show'],
                  ['api', 'api'],
                ],
                otherwise: `Check \`${process.env.prefix}help\` for more information`,
              };
              return Flag.continue(method);
           }
        });
    }
}

module.exports = subcommand