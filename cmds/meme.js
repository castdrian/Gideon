const Discord = module.require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports.run = async (gideon, message, args) => {  
    var files = fs.readdirSync(avmpath);
    let chosenFile = files[Math.floor(Math.random() * files.length)]

    const meme = new Discord.RichEmbed()
	    .setColor('#2791D3')
	    .attachFiles([chosenFile])
	    .setImage(`attachment://${chosenFile}`)
    	.setTimestamp()
    	.setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

    message.channel.send(meme);
}

module.exports.help = {
    name: "meme"
}