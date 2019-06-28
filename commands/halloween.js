const { get } = require("axios");

module.exports.help = {
  name: 'halloween'
}

module.exports.run = async (bot, message, args) => {

let user = message.mentions.users.first() || message.author
    const { get } = require('axios');

   get('https://eclyssia-api.tk/api/v1/jackolantern?url='+user.displayAvatarURL+'&username='+user.username, {  responseType: 'arraybuffer'})
     .then((response) => {
        message.channel.send({
           file: {
             attachment: response.data,
             name: "halloween.png"
         }
     }); 
    })};

module.exports.help = {
    name: 'halloween'

};