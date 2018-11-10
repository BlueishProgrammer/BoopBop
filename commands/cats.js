module.exports = {
    name: 'cats',
    description: 'Sends cat photos in the chat',
    usage: "!cats [PhotoNumber]",
    arguments: {
        "number": {
            "required": false,
            "type": Number
        }
    },
    enabled: true,
    guildOnly: false,
    aliases: ["catbomb"],
    permLevel: 0,
    arguments: [{
        name: 'PhotoNumber',
        desc: 'The number of photos you want to receive',
        type: 'number',
        required: false
    }],
    execute(message, args) {
        const {
            get
        } = require("snekfetch"),
            Discord = require('discord.js');
        if (args.length == 0) args[0] = 1;
        if (args.length >= 25) {
            args[0] = 25;
            message.channel.send(`Only 25 Cats a time`);
        }

        for (var i = 0; i < args[0]; i++) {
            try {
                get('https://aws.random.cat/meow').then(res => {
                    const embed = new Discord.RichEmbed()
                        .setImage(res.body.file)
                    return message.channel.send({
                        embed
                    });
                });
            } catch (error) {
                console.error(error);
            }
        }
    }
};