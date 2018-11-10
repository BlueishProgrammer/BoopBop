module.exports = {
  name : "lhelp",
  description: "Gives information about a command",
  usage: "lhelp [Command]",
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  arguments: [{
      name: 'Command',
      desc: 'The command you want information on',
      type: 'string',
      required: false
 }],
  execute(message, args, client) {
    if (!args[0]) {
        message.channel.sendCode("asciidoc", `= Command List =\n\n[Use !lhelp <commandname> for details]\n\n${client.commands.filter(checkEnabled).map(c=>`${c.name}:: ${c.description}`).join("\n")}`);
  } else {
    let command = args[0];
    if(client.commands.has(command)) {
      command = client.commands.get(command);
      message.channel.sendCode("asciidoc", `= ${command.name} = \n${command.description}\nusage:: ${command.usage}\naliase(s):: ${command.aliases.join(", ")}\nargument(s):: \n  ${command.arguments.map(a=>`${a.required?`(${a.name})`:a.name}: ${a.desc} [${a.type}]`).join("\n  ")}\nArguments in Parentheses are Required`);
    }
  }
}
};

function checkEnabled(obj) {
  if(obj.enabled==true) return true;
  return false;
}