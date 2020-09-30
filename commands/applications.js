const Command = require('../base/Command.js');
const moment = require('moment');

class ApplicationsCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'applications',
            description: 'does smth.',
            category: 'Logging',
            usage: '!applications [amount] [start] [end] [startpmam] [endpmam]',
            aliases: ['apps', 'app']
        });
    }

    async run(message, args, trello) {

        const timeregex = /\d{1,2}:\d{2}/;
        const date = moment.utc(Date.now()).format('L');

        if (!args[0] || !args[1] || !args[2] || !args[3] || !args[4]) return message.channel.send(`Invalid usage, correct one: ${this.config.usage}`);
        if (isNaN(args[0])) return message.channel.send(`Invalid usage, correct one: ${this.config.usage}`);
        if (!args[1].match(timeregex)) return message.channel.send(`Invalid usage, correct one: ${this.config.usage}`);
        if (!args[2].match(timeregex)) return message.channel.send(`Invalid usage, correct one: ${this.config.usage}`);
        if (!args[3].match(/am|pm/i) || !args[4].match(/am|pm/i)) return message.channel.send(`Invalid usage, correct one: ${this.config.usage}`);

        const comment = `${args[0]} Applications | ${args[1]} ${args[3]} - ${args[2]} ${args[4]} EEST | ${date}.`

        trello.addCommentToCard('5f719e4bd1ab75610bbdcba2', comment, (error, com) => {
            if (error) console.error(error);

            message.channel.send(`Done! Sent a comment containing: \`${comment}\``);
        });

    }
}

module.exports = ApplicationsCommand;