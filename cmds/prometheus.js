const Discord = module.require("discord.js");
const Imgur = require('imgur-node');
const imgclient = new Imgur.Client('fbe1de02978b3b4');

module.exports.run = async (gideon, message, args) => {      
    imgclient.album.get('ZU6IgLo', (err, res) => {
    if (err) console.error(err);
    console.log(res);  
    let min = 0;
    let max = res.images.length - 1;
    let ranum = Math.floor(Math.random()*(max - min + 1)) + min;
    let rpmt = res.images[ranum].link;
    console.log(rpmt);

    const pmt = new Discord.RichEmbed()
        .setColor('#2791D3')
        .setImage(rpmt)
        .setTimestamp()
        .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

        message.channel.send(pmt);
  });   
}

module.exports.help = {
    name: "prometheus"
}