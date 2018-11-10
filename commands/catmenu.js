module.exports = {
    name: 'catmenu',
    description: 'Launches a menu to select a number of cat photos',
    usage: "!catmeny",
    enabled: true,
    guildOnly: false,
    aliases: ["cm","showmecats"],
    permLevel: 0,
    arguments: [],
    execute(message, args, client, menus) {
        message.channel.sendMenu(menus.catMenu);
    }
};