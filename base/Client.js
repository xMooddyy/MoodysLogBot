const { Client, Collection } = require('discord.js');
const { readdirSync } = require('fs');
const util = require('util');
const path = require('path');

module.exports = class MoodyClient extends Client {
	constructor(options) {
		super(options);

		this.commands = new Collection();
		this.aliases = new Collection();
		this.wait = util.promisify(setTimeout);
  }

	loadCommand(commandPath, commandName) {
    try {
      const props = new (require(`${commandPath}${path.sep}${commandName}`))(this);
      if (props.init) {
        props.init(this);
      }
      this.commands.set(props.config.name, props);
      if(props.config.aliases) {
props.config.aliases.forEach(alias => {
        this.aliases.set(alias, props.config.name);
      });
}
      return false;
    }
 catch (e) {
      return `Unable to load command ${commandName}: ${e}`;
    }
  }

  async reloadCommand(commandPath, commandName) {
    let command;
    if (this.commands.has(commandName)) {
      command = this.commands.get(commandName);
    }
 else if (this.aliases.has(commandName)) {
      command = this.commands.get(this.aliases.get(commandName));
    }
    if (!command) return `The command \`${commandName}\` doesn"t seem to exist, nor is it an alias. Try again!`;

    if (command.shutdown) {
      await command.shutdown(this);
    }
    delete require.cache[require.resolve(`${commandPath}${path.sep}${commandName}.js`)];
    this.commands.delete(command);
    const props = new (require(`${commandPath}${path.sep}${commandName}`))(this);
    this.commands.set(props.config.name, props);
    if(props.config.aliases) props.config.aliases.forEach(a => this.aliases.set(a, props.config.name));
    return false;
  }

  async unloadCommand(commandPath, commandName) {
    let command;
    if (this.commands.has(commandName)) {
      command = this.commands.get(commandName);
    }
 else if (this.aliases.has(commandName)) {
      command = this.commands.get(this.aliases.get(commandName));
    }
    if (!command) return `The command \`${commandName}\` doesn"t seem to exist, nor is it an alias. Try again!`;

    if (command.shutdown) {
      await command.shutdown(this);
    }
    delete require.cache[require.resolve(`${commandPath}${path.sep}${commandName}.js`)];
    return false;
  }


	generateKey(length) {
		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}
};
