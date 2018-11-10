module.exports = {
    name: 'starboard',
    description: 'displays the top three most popular messages',
    usage: "!starboard",
    arguments: {"number":{"required" : false, "type" : Number}},
    enabled: false,
    guildOnly: false,
    aliases: ["str","sb","stb","stars","top3","board"],
    permLevel: 0,
    execute(message, args, client) {
        var reaction = client.customObj;
        const starboard = reaction.message.guild.channels.find('name', 'hall-of-fame');
        var embed = new Discord.RichEmbed()
            .setAuthor(`Hall of fame nomination with ${starCount} stars`)
            .addField(`Author:`, reaction.message.author.username)
            .addField('Message:', reaction.message.content)
            .setImage(reaction.message.author.avatarURL)
            .setFooter('Upvote this message using the ⭐ emoji!')
        starboard.send({embed});
    }
};

client.on('guildCreate', newGuild => {
    console.error;
    var name = GuildName(newGuild.name);
    sql.get(`SELECT score FROM ${name} WHERE messageid ="${name}"`).then(row => {
        if (!row) {
            sql.run(`INSERT into Guilds (ServerName, ServerOwner, TopAmount) VALUES ("${name}", "${newGuild.owner}", "3")`);
        } else {
            sql.run(`Update ${name} SET ServerOwner = ${newGuild.owner} where ServerName = "${name}"`);
        }
        }).catch(() => {
            console.error;
        });
    sql.run(`CREATE TABLE IF NOT EXISTS ${name} (author TEXT, message Text, score INTEGER, messageid INTEGER)`)
        .catch(() => {
        console.error;
    });
});

client.on('messageReactionAdd', function(reaction) {
    if (reaction.emoji.name === '⭐') {
        const guild = GuildName(reaction.message.guild.name);
        const message = reaction.message;
        sql.get(`SELECT score FROM ${guild} WHERE messageid ="${guild}"`).then(row => {
        if (!row) {
            sql.run(`INSERT INTO ${guild} (author, message, score, messageid) VALUES (?, ?, ?, ?)`, [message.author.username+'#'+message.author.discriminator, message.content, 1, message.id]);
        } else {
            sql.run(`Update ${guild} SET score = score + 1 where messageid = "${message.id}"`);
        }
        }).catch(() => {
            console.error;
        });
    }
}); var reactions = '⭐';
function GuildName(guild) {
    return "Guild" + guild.replace(/[^a-zA-Z ]/g, "");
}const sql = require("sqlite");
sql.open("./database.sqlite");
    


//
// ─── CLAPP ──────────────────────────────────────────────────────────────────────
//

        const Clapp = require("clapp-discord");

let app = new Clapp.App({
    name: "Discord Bot",
    desc: "A bot for Discord",
    prefix: "$",
    separator: "",
    version: "1.0",
    onReply: function (msg, context) {
        // Fired when input is needed to be shown to the user.
    console.log(context.msg)
        context.msg.channel.send(msg).then(botResponse => {});
      }
    });

fs.readdirSync("./temp/").forEach(file => {
    app.addCommand(require("./temp/" + file));
});


client.on("message", msg => {
    // Fired when someone sends a message

    if (app.isCliSentence(msg.content)) {
        // Keep adding properties to the context as you need them
        app.parseInput(msg.content, {
            msg
        });
    }
})