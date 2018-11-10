module.exports = {
    name: 'give',
    description: 'Gives item to someone',
    usage: "!give (User)",
    enabled: true,
    guildOnly: false,
    aliases: ["give", "giveItem"],
    permLevel: 0,
    arguments: [{
        name: 'User',
        desc: 'The user or person you want to give to',
        type: 'string',
        required: true
   }],
    execute(message, args) {
        console.log(args.length == 1);
        if (args.length == 1/* && args[0].match(/(<@\d*>)/gi) != null*/) {
            const low = require('lowdb')
            const FileSync = require('lowdb/adapters/FileSync')
            const adapter = new FileSync('data.json')
            const db = low(adapter)
            db.set(message.guild.id, args[0])
                .write();
            message.channel.send(`Guess what ${args[0]}, you've got the item`);
        }
        // Just add any case commands if you want to..
    }
};