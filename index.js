require('dotenv').config

String.prototype.toProperCase = function() {
	return this.toLowerCase().replace(/(^|[\s.])[^\s.]/gm, (s) => s.toUpperCase());
};

String.prototype.chars = function(max) {
  return ((this.length > max) ? `${this.slice(0, max)}...` : `${this}`);
};

Array.prototype.random = function() {
	return this[Math.floor(Math.random() * this.length)];
};

Array.prototype.findDuplicates = function() {
    const sorted_arr = this.slice().sort();
    const results = [];
    for (let i = 0; i < sorted_arr.length - 1; i++) {
        if (sorted_arr[i + 1] == sorted_arr[i]) {
            results.push(sorted_arr[i]);
        }
    }
    return results;
};

Array.prototype.diff = function(a) {
 return this.filter((i) => {
 return a.indexOf(i) === -1;
 });
};

const Client = require('./base/Client.js');
const bot = new Client({ fetchAllMembers: true });
const fetch = require('node-fetch');

['command', 'event'].forEach(x => require(`./handlers/${x}`)(bot));

bot.login(process.env.TOKEN);