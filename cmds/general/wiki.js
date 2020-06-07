import Discord from 'discord.js';
import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(message, args) {
    let wikis = [
        {
            url: 'arrow.fandom.com',
            title: 'Arrowverse'
        },
        {
            url: 'stargirltv.fandom.com',
            title: 'Stargirl'
        },
        {
            url: 'dc.fandom.com',
            title: 'DC'
        },
        {
            url: 'krypton.fandom.com',
            title: 'Krypton'
        },
        {
            url: 'lucifer.fandom.com',
            title: 'Lucifer'
        },
        {
            url: 'doompatrol.fandom.com',
            title: 'Doom Patrol'
        },
    ];
    
    let wiki = wikis[-1];

    let command = message.content.toLowerCase().split(' ')[0];

    if (command.endsWith('wiki')) wiki = wikis[0];
    else if (command.endsWith('stg')) wiki = wikis[1];
    else if (command.endsWith('dc')) wiki = wikis[2];
    else if (command.endsWith('kr')) wiki = wikis[3];
    else if (command.endsWith('lu')) wiki = wikis[4];
    else if (command.endsWith('dp')) wiki = wikis[5];
    else return message.channel.send('Supply a valid Wiki!');

    let search_term = args.join(' ');

    if (!search_term) return message.channel.send('You must supply a search term!');

    const search_api = encodeURI(`https://${wiki.url}/api/v1/SearchSuggestions/List?query=${search_term}`);

    try {
        const search = await Util.fetchJSON(search_api);

        if (search && search.items && search.items.length === 1) search_term = search.items[0].title;

        const api = encodeURI(`https://${wiki.url}/api/v1/Articles/Details?ids=50&titles=${search_term}&abstract=500&width=200&height=200`);

        const body = await Util.fetchJSON(api);

        //stargirl, doom patrol & krypton do some weird stuff, therefore the actual result is the 2nd element
        const article = Object.values(body.items)[wikis.indexOf(wiki) == 1 || wikis.indexOf(wiki) == 3 ? 1 : 0 || wikis.indexOf(wiki) == 5 ? 1 : 0];

        if (Object.keys(body.items).length < 1) return message.channel.send(Util.CreateEmbed(`There was no result for ${search_term} on the ${wiki.title} Wiki!`, null, message.member));
        
        const url = article.url.replace(/\(/g, '%28').replace(/\)/g, '%29');

        let st = '';
        let cvm = process.gideon.getGuild.get(message.guild.id);
        if (cvm) {
            if (cvm.cvmval === 1) st = '||';
        }
        
    
        message.channel.send(Util.CreateEmbed(article.title, {
            description: `${st}${article.abstract}${st}\n\n**[Click here to read the full article](https://${wiki.url}${url} 'https://${wiki.url}${url}')**`,
            thumbnail: article.thumbnail
        }, message.member)); 
    }

    catch (ex) {
        Util.log('Error occurred while fetching data from wiki: ' + ex.stack);
        message.channel.send(Util.CreateEmbed('Failed to fetch info from wiki!', null, message.member));
    } 
}

export const help = {
    name: ['wiki', 'wikistg', 'wikidc', 'wikikr', 'wikilu', 'wikidp'],
    type: 'general',
    help_text: 'wiki[stg|kr|lu|dc] <term>',
    help_desc: 'Searches the specified wiki for the given term | stg - Stargirl | kr - Krypton | lu - Lucifer | dc - DC | dp - Doom Patrol',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {force: true},
    roles: [],
    user_perms: [],
    bot_perms: []
};