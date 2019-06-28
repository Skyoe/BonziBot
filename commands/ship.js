const Discord = require("discord.js")

module.exports.help = {
    name: 'ship'
}

module.exports.run = (client, message, args) => {
    if(message.mentions.users.array()[0]) {
        var user = message.mentions.users.array()[0]["username"];
        if (message.mentions.users.array()[1]) {
        var user1 = message.mentions.users.array()[1]["username"];
        var leng = user.length
        var leng1 = user1.length
        if(user && user1) {
        var take = user.substring(0,leng * 0.5)
        var take1 = user1.substring(leng1 * 0.5,leng1)
        var shipname = (take + take1)
        var embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(`:heart_exclamation:  the most beautiful couple of the year is **${shipname}** :heart_exclamation: `)
          message.channel.send({embed});
        } else {
          message.reply("Please, mention someone")
        }
        } else {
          message.reply("Please, mention someone")
        }
        }
}
