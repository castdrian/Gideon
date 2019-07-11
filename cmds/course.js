const Discord = module.require("discord.js");

module.exports.run = async (gideon, message, args) => {

    message.channel.send('Yes Captain Lance!');

        const dateapi = 'https://api.myjson.com/bins/p4zc7';

        snekfetch.get(api).then(r => {
            console.log(r.body);
            let body = r.body;   
            let upDate = new Date(body.updated_at);
    
            const github = new Discord.RichEmbed()
            .setColor('#2791D3')
            .setTitle(body.name)
            .setDescription(body.description + `\n\nOwner: [adrifcastr](${body.owner.html_url} '${body.owner.html_url}')\nRepo: [Gideon](${body.html_url} '${body.html_url}')\nDiscord: [Time Vault](${body.homepage} '${body.homepage}')\nLanguage: \`${body.language}\`\nLast Update: \`${upDate.toUTCString()}\`\nOpen Issues: \`${body.open_issues_count}\`\nStargazers: \`${body.stargazers_count}\`\nWatchers: \`${body.watchers_count}\`\nForks: \`${body.forks_count}\`\nGit Clone: \`${body.clone_url}\``)
            .setThumbnail(body.owner.avatar_url)
            .setTimestamp()
            .setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');
    
            message.channel.send(github); 
        });       

        const future = new Discord.RichEmbed()
	    .setColor('#2791D3')
	    .setImage('https://i.imgur.com/cS3fZZv.jpg')
    	.setTimestamp()
    	.setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

        message.channel.send(future);
}

module.exports.help = {
    name: "plot a course!"
}