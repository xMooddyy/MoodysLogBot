const Command = require('../base/Command.js');
const moment = require('moment');

class ShiftCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'shift',
            description: 'does smth.',
            category: 'Logging',
            usage: '!shift [start] [end] [startpmam] [endpmam] [afk]'
        });
    }

    async run(message, args, trello) {

        const timeregex = /\d{1,2}:\d{2}/;
        const date = moment.utc(Date.now()).format('L');

        if (!args[0] || !args[1] || !args[2] || !args[3] || !args[4]) return message.channel.send(`Invalid usage, correct one: ${this.config.usage}`);
        if (!args[0].match(timeregex)) return message.channel.send(`Invalid usage, correct one: ${this.config.usage}`);
        if (!args[1].match(timeregex)) return message.channel.send(`Invalid usage, correct one: ${this.config.usage}`);
        if (!args[2].match(/am|pm/i) || !args[3].match(/am|pm/i)) return message.channel.send(`Invalid usage, correct one: ${this.config.usage}`);
        if (isNaN(args[4])) return message.channel.send(`Invalid usage, correct one: ${this.config.usage}`);

        const comment = `Shift | ${args[0]} ${args[2]} - ${args[1]} ${args[3]} EEST | AFK: ${args[4]} | ${date}.`;

        trello.addCommentToCard('5f719e4bd1ab75610bbdcba2', comment, (error, com) => {
            if (error) console.error(error);

            message.channel.send(`Done! Sent a comment containing: \`${comment}\``);
        });

    }
}

module.exports = ShiftCommand;