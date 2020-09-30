const Discord = require('discord.js');
const cooldowns = new Discord.Collection();
const Trello = require('trello');
const trello = new Trello('e24423b99a54f7e0bc7b6ae074e2af03', '6d2599fa1ee5ac35d255ee42928d7b88ad72734c0033c19b80f49441b5b0a4c4');

module.exports = class {
  constructor(bot) {
    this.bot = bot;
  }

  async run(message) {

  if(message.author.bot || message.channel.type === 'dm') return;

  const prefixMention = new RegExp(`^<@!?${this.bot.user.id}> `);
	const prefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : '!';


	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();

  if(!message.content.startsWith(prefix)) return;

  const commandfile = this.bot.commands.get(cmd) || this.bot.commands.get(this.bot.aliases.get(cmd));
  if (commandfile) {

			if (commandfile.config.userPermissions && !message.member.hasPermission(commandfile.config.userPermissions)) return message.channel.send(`The \`${commandfile.config.name}\` command requires you to have the '${permissions[commandfile.config.userPermissions[0]]}' permission(s).`);

			if (commandfile.config.botPermissions && !message.guild.me.hasPermission(commandfile.config.botPermissions)) return message.channel.send(`The \`${commandfile.config.name}\` command requires me to have the '${permissions[commandfile.config.botPermissions[0]]}' permission(s).`);

			if (commandfile.config.ownerOnly && commandfile.config.ownerOnly === true && message.author.id !== '413834975347998720') return message.channel.send(`The \`${commandfile.config.name}\` command can only be used by the bot owner`);
			if (message.author.id !== '413834975347998720' && commandfile.config.enabled === false) return message.channel.send(`The command\`${commandfile.config.name}\` is disabled.`);

    }

    if (!cooldowns.has(commandfile.config.name)) cooldowns.set(commandfile.config.name, new Discord.Collection());

		const now = Date.now();
		const timestamps = cooldowns.get(commandfile.config.name);
		const cooldownAmount = (commandfile.config.cooldown) * 1000;


		if (!timestamps.has(message.author.id) && message.author.id !== '413834975347998720') {
			timestamps.set(message.author.id, now);
			setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
		}
		else {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
			if (now < expirationTime && message.author.id !== '413834975347998720') {
				const timeLeft = (expirationTime - now) / 1000;
				return message.channel.send(`Please wait ${timeLeft.toFixed(1)} more second(s) before using the \`${commandfile.config.name}\` command. ${message.author}`);
			}

			timestamps.set(message.author.id, now);
			setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

		}

    try {
      commandfile.run(message, args, trello);
    }
    catch(e) {
      console.log(e);
      message.channel.send(`An error occured while executing this command! Report this to the bot owner: \`${e}\``);
    }
  }
};
