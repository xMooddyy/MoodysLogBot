const Command = require('../base/Command.js');
const { MessageEmbed } = require('discord.js');

/*
  The HELP command is used to display every command's name and description
  to the user, so that he may see what commands are available. The help
  command is also filtered by level, so if a user does not have access to
  a command, it is not shown to them. If a command name is given with the
  help command, its extended help is shown.
*/
class Help extends Command {
    constructor(bot) {
        super(bot, {
            name: 'help',
            description: 'Displays all the available commands for you.',
            category: 'Miscellaneous',
            usage: 'help [command]',
            aliases: ['h', 'halp']
        });
    }

    async run(message, args) {


        if (!args[0]) {
            const myCommands = this.bot.commands;
            const commandNames = myCommands.keyArray();
            const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
            let currentCategory = "";
            const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL({ dynamic: true }))
                .setThumbnail(this.bot.user.displayAvatarURL({ dynamic: true }))
                .setDescription(`These are the avaliable commands for ${message.guild.me.displayName}\nThe bot prefix for this server is: \`!!\` or \`${this.bot.user.tag}\``)
                .setFooter(`© ${message.guild.me.displayName} | Total Commands: ${this.bot.commands.size}`, this.bot.user.displayAvatarURL({ dynamic: true }));
            const sorted = myCommands.array().sort((p, c) => p.config.category > c.config.category ? 1 : p.config.name > c.config.name && p.config.category === c.config.category ? 1 : -1);
            sorted.forEach(c => {
                const cat = c.config.category.toProperCase();
                if (currentCategory !== cat) {
                    currentCategory = cat;
                    if (message.author.id === '413834975347998720') embed.addField(`❯ ${currentCategory} [${myCommands.filter(a => a.config.category == currentCategory).size}]`, myCommands.filter(a => a.config.category == currentCategory).map(b => `\`${b.config.name}\``).join(' | '));
                    else if (currentCategory !== 'Owners') embed.addField(`❯ ${currentCategory} [${myCommands.filter(a => a.config.category == currentCategory).size}]`, myCommands.filter(a => a.config.category == currentCategory).map(b => `\`${b.config.name}\``).join(' | '));
                }
            });

            message.channel.send(embed);

        }
        else {
            let command = args[0];
            if (this.bot.commands.has(command)) {
                command = this.bot.commands.get(command);
                message.channel.send(`= ${command.config.name} = \n${command.config.description}\nUsage:: ${command.config.usage}\nAliases:: ${command.config.aliases.join(', ')}`, { code: 'asciidoc' });
            }
        }
    }
}

module.exports = Help;