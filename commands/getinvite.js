module.exports = {
    name: 'getinvite',
    description: 'Gets an invite link for the guild (Guild)',
    usage: "!getinvite",
    arguments: {},
    enabled: true,
    guildOnly: false,
    aliases: ["invitelink","gl"],
    arguments: [{
        name: 'Guild',
        desc: 'Not currently implemented',
        type: 'string',
        required: false
   }],
    permLevel: 0,
    execute(message, args) {
        message.guild.channels.get(getDefaultChannel(message.guild).id).createInvite().then(invite =>
            message.channel.send(invite.url)
        );
    }
};

const getDefaultChannel = (guild) => {
    var Long = require("long");
    if(guild.channels.has(guild.id))
      return guild.channels.get(guild.id)
   
    if(guild.channels.exists("name", "general"))
      return guild.channels.find("name", "general");
    return guild.channels
     .filter(c => c.type === "text" &&
       c.permissionsFor(guild.client.user).has("SEND_MESSAGES"))
     .sort((a, b) => a.position - b.position ||
       Long.fromString(a.id).sub(Long.fromString(b.id)).toNumber())
     .first();
  }
   
