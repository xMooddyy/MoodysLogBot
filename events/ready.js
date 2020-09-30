const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = class {
    constructor(bot) {
        this.bot = bot;
    }

    async run() {
        console.log(
            `${this.bot.user.username
            } is ready to watch ${this.bot.guilds.cache.reduce(
                (prev, val) => val.memberCount + prev,
                0
            )} users and ${this.bot.guilds.cache.size} servers!`
        );

        const statuses = [
            `${this.bot.guilds.cache.size} servers!`,
            '!help | Made by ahmood#0001',
            `over ${this.bot.guilds.cache.reduce(
                (prev, val) => val.memberCount + prev,
                0
            )} users!`
        ];

        this.bot.user.setActivity(statuses.random(), { type: 'WATCHING' });
    }
}; 
