module.exports = {
    name: 'logger',
    description: 'Logs info to the console',
    usage: "!logger",
    enabled: false,
    guildOnly: false,
    aliases: ["log"],
    permLevel: 0,
    arguments: [],
    execute(message, args, client) {
        console.log(message.guild);
        client.emit("guildCreate", message.guild);
        client.emit("guildMemberAdd", message.member);
    }
};