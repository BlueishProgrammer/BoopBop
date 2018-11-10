const fs = require('fs'),
    config = require('./config.json'),
    Discord = require('discord.js'),
    client = new Discord.Client();
client.commands = new Discord.Collection();
require('discord.js-aliases');

const low = require('lowdb'),
    FileSync = require('lowdb/adapters/FileSync'),
    adapter = new FileSync('data.json'),
    db = low(adapter);

var aliases = {},
    menus = {};

client.on('ready', () => {
    client.user.setUsername("Lyla");
    client.user.setActivity('With Your Mind');
    client.user.setStatus("online");
    console.log(`Logged in as ${client.user.tag}!`);
});

const RC = require('reaction-core');
const handler = new RC.Handler();
createMenu("catMenu");

client.on('messageReactionAdd', (messageReaction, user) => handler.handle(messageReaction, user, client));

client.on('guildMemberAdd', msg => { // Commands Go Inside The client.on('message', msg => 
    //msg.guild.channels.get(msg.guild.channels.find("name", "general").id).send({"content":"","embed":{"title":`Welcome To (${msg.guild.name})!`,"description":`Hi <@${msg.user.id}>!\nThe rules can be found on ${msg.guild.channels.get(msg.guild.channels.find("name", "rules").id)}`,"url":"","color":52894,"fields":[],"thumbnail":{"url":""},"image":{"url":""},"author":{"name":`Server`,"url":"","icon_url":``},"footer":{"text":"","icon_url":""}}}); });

    const starboard = msg.guild.channels.find("name", "general");
    var embed = new Discord.RichEmbed()
        .setAuthor(`Welcome to ${msg.guild.name}`)
        .addField(`Rules @`, `${msg.guild.channels.get(msg.guild.channels.find("name", "rules").id)}`)
        .addField('Names @', `${msg.guild.channels.get(msg.guild.channels.find("name", "names").id)}, please add yours`)
        // .setImage(reaction.message.author.avatarURL)
        .setFooter('Have fun!')
    starboard.send({
        embed
    });
});

fs.readdir(`./commands/`, (err, files) => {
    if (err) console.error(err);
    console.log(`Loading a total of ${files.length} commands.`);

    files.forEach(f => {
        let props = require(`./commands/${f}`);
        console.log(`${f != files[files.length-1]?"├──":"└──"}Loading Command: ${props.name}`);

        client.commands.set(props.name, props);
        props.aliases.forEach(alias => {
            console.log(`${f != files[files.length-1]?"│   ":"    "}${alias != props.aliases[props.aliases.length-1]?"├──":"└──"}Loading ${props.name} Alias: ${alias}`);
            // client.commands.set(alias, props);
            if (!Array.isArray(aliases[props.name])) aliases[props.name] = [];
            aliases[props.name].push(alias);
        });
    });
    console.log(`\r\n`);
});

client.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;
    const args = message.content.slice(config.prefix.length).split(/ +/);
    var command;

    const commandName = args.shift().toLowerCase();
    if (commandName == "yoman") {
        message.channel.sendMenu(menus.catMenu);
        return;
    }
    if (client.commands.has(commandName)) {
        command = client.commands.get(commandName);
    } else {
        for (var item in aliases) {
            if (aliases[item].includes(commandName)) command = client.commands.get(item);
        }
    }
    if (command == undefined) return;


    try {
        command.execute(message, args, client, menus);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
    // do the same for the rest of the commands...
});

function createMenu(name) {
    const example = require(`./IconMenu/${name}`);
    menus[name] = new RC.Menu(example.embed, example.buttons, example.options);
    handler.addMenus(menus[name]);
}

client.login(config.token);