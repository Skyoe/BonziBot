const Discord = require("discord.js");
const bot = new Discord.Client();
const snek = require('snekfetch');
const fsn = require('fs-nextra');
module.exports.help = {
  name: 'hitler'
}
exports.run = async (client, message, args) => {
  if (!message.guild.member(client.user).hasPermission('ATTACH_FILES')) return message.reply("Sorry, I don't have the permission to use this command. I need ATTACH_FILES. :x:")
   const { Canvas } = require('canvas-constructor');
    if (message.mentions.users.size < 1) return message.channel.send("Mention someone.");
   const getSlapped = async (person) => {
    const plate = await fsn.readFile('./assets/images/hitler.jpg');
    const png = person.replace('.gif', '.png');
    const { body } = await snek.get(png);
    return new Canvas(480,360)
    .resetTransformation()
    .addImage(plate, 0, 0, 480,360)
    .addImage(body, 42,28,150, 170, { type: 'rect', radius: 85 })
    .toBuffer();
  }
     try {
    const person = message.mentions.users.first().avatarURL;
    const result = await getSlapped(person);
    await message.channel.send({ files: [{ attachment: result, name: 'hitler.png' }] });
  } catch (error) {
    throw error;
  }
}