module.exports = {
    name: 'whomst',
    description: 'Sends message saying who "has" the item',
    usage: "!whomst",
    enabled: true,
    guildOnly: false,
    aliases: ["who"],
    permLevel: 0,
    arguments: [],
    execute(message, args) {
        const low = require('lowdb')
        const FileSync = require('lowdb/adapters/FileSync')
        const adapter = new FileSync('data.json')
        const db = low(adapter)
        args.push(db.get(message.guild.id).value());

        var msg = args[args.length - 1] != undefined ? `Suprise (well probably not), ${args[args.length - 1]} you've got the item` : `No-one currently has the item`
        message.channel.send(msg);
    }
};