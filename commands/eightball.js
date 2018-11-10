module.exports = {
    name: 'eightball',
    description: 'Gives you a quick, if unrelated, answer',
    usage: "!eightball",
    enabled: true,
    guildOnly: false,
    aliases: ["magiceightball","8ball","magic8ball","m8ball"],
    permLevel: 0,
    arguments: [{
        name: 'Question',
        desc: 'Your question for the 8Ball',
        type: 'string',
        required: true
    }],
    execute(message, args) {
        var options = [
            "It is certain",
            "It is decidedly so",
            "Without a doubt",
            "Yes – definitely",
            "You may rely on it",
            "As I see it, yes",
            "Most likely",
            "Outlook good",
            "Yes",
            "Signs point to yes",
            "Don’t count on it",
            "My reply is no",
            "My sources say no",
            "Outlook not so good",
            "Very doubtful",
            "Reply hazy, try again",
            "Ask again later",
            "Better not tell you now",
            "Cannot predict now",
            "Concentrate and ask again"
          ];
            message.channel.send(options[Math.floor(Math.random() * options.length)]);
        }
};