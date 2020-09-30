const Command = require('../base/Command.js');
const moment = require('moment');

class SessionCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'session',
            description: 'does smth.',
            category: 'Logging',
            usage: '!session [assisted/hosted] [type] [start] [end] [startpmam] [endpmam]'
        });
    }

    async run(message, args, trello) {

        const timeregex = /\d{1,2}:\d{2}/;
        const date = moment.utc(Date.now()).format('L');

        if (!args[0] || !args[1] || !args[2] || !args[3] || !args[4] || !args[5]) return message.channel.send(`Invalid usage, correct one: ${this.config.usage}`);
        if (!args[0].match(/assisted|hosted|co-hosted/i)) return message.channel.send(`Invalid usage, correct one: ${this.config.usage}`);
        if (!args[1].match(/training|trainings|interview|interviews/i)) return message.channel.send(`Invalid usage, correct one: ${this.config.usage}`);
        if (!args[2].match(timeregex)) return message.channel.send(`Invalid usage, correct one: ${this.config.usage}`);
        if (!args[3].match(timeregex)) return message.channel.send(`Invalid usage, correct one: ${this.config.usage}`);
        if (!args[4].match(/am|pm/i) || !args[5].match(/am|pm/i)) return message.channel.send(`Invalid usage, correct one: ${this.config.usage}`);

        const comment = `${args[0].toLowerCase() == 'assisted' ? 'Assisted' : args[0].toLowerCase() == 'co-hosted' ? 'Co-hosted' : 'Hosted'} ${args[1].match(/training|trainings/i) ? 'Training' : 'Interviews'} | ${args[2]} ${args[4]} - ${args[3]} ${args[5]} EEST | ${date}.`;

        trello.addCommentToCard('5f719e4bd1ab75610bbdcba2', comment, (error, com) => {
            if (error) console.error(error);

            message.channel.send(`Done! Sent a comment containing: \`${comment}\``);
        });
    }
}

module.exports = SessionCommand;