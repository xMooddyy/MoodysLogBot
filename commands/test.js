const Command = require('../base/Command.js');
const moment = require('moment');

class TestCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'test',
            description: 'does smth.',
            category: 'Logging',
            usage: '!test'
        });
    }

    async run(message, args, trello) {

        trello.addCommentToCard('5f74c104b3b5d86bfc1412c6', args.join(' '), (error, comment) => {
            if(error) console.error(error);

            message.channel.send(`Done! Sent a message containing: \`${args.join(' ')}\``);
        })
    }
}

module.exports = TestCommand;