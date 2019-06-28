const Discord = require("discord.js");
const bot = new Discord.Client();
const snek = require('snekfetch');
const fsn = require('fs-nextra');
module.exports.help = {
  name: 'triggered'
}
exports.run = async (client, message, args) => {
  if (!message.guild.member(client.user).hasPermission('ATTACH_FILES')) return message.reply("I don't have permission to use this command. :x:")
   const { Canvas } = require('canvas-constructor');
    if (message.mentions.users.size < 1) return message.channel.send("Mention someone.");
   const getSlapped = async (person) => {
    const plate = await fsn.readFile('./assets/images/triggered.png');
    const png = person.replace('.gif', '.png');
    const { body } = await snek.get(png);
    return new Canvas(330, 330)
    .resetTransformation()
    .addImage(body, 0, 0, 330, 330)
    .addImage(plate, 0, 250, 330, 80)
    .toBuffer();
  }
     try {
    const person = message.mentions.users.first().avatarURL;
    const result = await getSlapped(person);
    await message.channel.send({ files: [{ attachment: result, name: 'trigger.png' }] });
  } catch (error) {
    throw error;
  }
}