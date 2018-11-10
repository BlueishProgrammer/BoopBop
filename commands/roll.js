const manager = require("argument-manager");

module.exports = {
    name: 'roll',
    description: 'Gives a number between the first and second number',
    usage: "!roll (LowNumber) (HighNumber)",
    enabled: true,
    guildOnly: false,
    aliases: ["dice", "random"],
    permLevel: 0,
    arguments: [{
        name: 'LowNumber',
        desc: 'Lower range',
        type: 'number',
        required: true
   },{
        name: 'HighNumber',
        desc: 'Upper range',
        type: 'number',
        required: true
   }],
    execute(message, args, client) {
        var argumentManaged = manager.manager(this.arguments, args, message, client, this.name);
        if (argumentManaged) message.channel.send("You rolled a " + (Math.floor(Math.random() * (Number(args[1]) - Number(args[0]) + 1)) + Number(args[0])));
    }
};