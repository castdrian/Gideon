const Discord = require("discord.js");
const fetch = require('node-fetch');
const Util = require("../../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {     
    const api = 'https://gideonbot.co.vu/api/status';

    try {
        const body = await fetch(api).then(res => res.json()); 
    
        message.channel.send(Util.CreateEmbed('Gideon API status:', {
            description: `${body.API.status}`,
            thumbnail: Util.config.avatar
        }));
    }
    
    catch (ex) {
        console.log("Caught an exception while fetching API data: " + ex.stack);
        Util.log("Caught an exception while fetching API data: " + ex.stack);
        return message.channel.send(Util.CreateEmbed('An error occurred while fetching github data!'));
    }
}

module.exports.help = {
    name: ['status', 'api'],
    type: "stats",
    help_text: "status",
    help_desc: "Checks Gideon's API status",
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
}