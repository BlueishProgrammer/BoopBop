module.exports = {
    name: 'owo',
    description: 'OwOs',
    usage: "!owo",
    enabled: true,
    guildOnly: false,
    aliases: ["uwu"],
    permLevel: 0,
    arguments: [],
    execute(message, args) {
            message.channel.send(`https://www.youtube.com/watch?v=wZZ7oFKsKzY`);
        }
};