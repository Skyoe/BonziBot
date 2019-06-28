const Discord = require("discord.js")
const ytdl = require('ytdl-core')

module.exports.help = {
  name: 'leave'
}

exports.run = async (client, message, args, ops) => {

if (!message.member.voiceChannel) return message.channel.send('Please connect to a voice channel');

if (!message.member.voiceChannel) return message.channel.send("Sorry, the bot isn't connected to the guild.");

if (!message.member.voiceChannel) return message.channel.send("Sorry you aren't connected.");

message.guild.me.voiceChannel.leave();

message.channel.send('Leaving channel...');
}