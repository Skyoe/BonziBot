const Discord = require("discord.js")

module.exports.help = {
  name: 'howgay'
}

module.exports.run = (client, message, args) => {

  var gayPerecent = Math.floor(Math.random() * 100)
  if(message.mentions.users.first()) {
    var user = message.mentions.users.first()
    var embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor("Bonzi Bot")

    if(gayPerecent > 50) {
    embed.setDescription(`${user.username} is ${gayPerecent}% gay :gay_pride_flag:`)
    } else {
    embed.setDescription(`${user.username} is ${gayPerecent}% gay :gay_pride_flag: `)
    }
      message.channel.send({embed});
  } else {
    var embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor("Bonzi Bot")

    if(gayPerecent > 50) {
    embed.setDescription(`${message.author.username} is ${gayPerecent}% gay :gay_pride_flag: `)
    } else {
    embed.setDescription(`${message.author.username} is ${gayPerecent}% gay :gay_pride_flag: `)
    }
      message.channel.send({embed});
  }
}
