const options = {
  count: 0
}

const buttons = [{
  emoji: "🐱",
  run: (user, message, client) => {
    client.commands.get("cats").execute(message, ["1"]);
    if (options.count < 5) { options.count ++ } else {message.delete(1000);} ;
  }
}, {
  emoji: "😻",
  run: (user, message, client) => {
    client.commands.get("cats").execute(message, ["5"]);
    if (options.count < 5) { options.count + 5 } else {message.delete(1000);} ;
  }
}, {
  emoji: "🙀",
  run: (user, message, client) => {
    client.commands.get("cats").execute(message, ["15"]);
    message.delete(1000);
  }
}, ]

const embed = {
  fields: [{
    name: '🐱',
    value: '1 Cat Pic'
  },{
    name: '😻',
    value: '5 Cats Photo'
  },{
    name: '🙀',
    value: '15 Cats Photographies'
  }]
}


module.exports = {
  buttons: buttons,
  embed: embed,
  options: options
}