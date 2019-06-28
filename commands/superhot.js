const Discord = require("discord.js");
const bot = new Discord.Client();
const snek = require('snekfetch');
const fsn = require('fs-nextra');
module.exports.help = {
  name: 'superhot'
}
exports.run = async (client, message, args) => {
  if (!message.guild.member(client.user).hasPermission('ATTACH_FILES')) return message.reply('I cant do it, I need permissions. :x:')
   const { Canvas } = require('canvas-constructor');
    if (message.mentions.users.size < 1) return message.channel.send("Mention someone");
   const getSlapped = async (person) => {
    const plate = await fsn.readFile('./assets/images/superhot.jpg');
    const png = person.replace('.gif', '.png');
    const { body } = await snek.get(png);
    return new Canvas(293, 468)
    .resetTransformation()
    .addImage(plate, 0, 0, 293, 468)
    .addImage(body, 4,11,146,194)

    .toBuffer();
  }
     try {
    const person = message.mentions.users.first().avatarURL;
    const result = await getSlapped(person);
    await message.channel.send({ files: [{ attachment: result, name: 'superhot.jpg' }] });
  } catch (error) {
    throw error;
  }
}