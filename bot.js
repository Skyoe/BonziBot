const randomPuppy = require('random-puppy');
const snekfetch = require('snekfetch');
const ascii = require('ascii-art');
const active = new Map();
var cheerio = require("cheerio");
var request = require("request");

const Discord = require("discord.js");
const  client = new Discord.Client();
const config = require("./config.json");
const ms = require("ms");
const fs = require("fs")
const ytdl = require('ytdl-core')
const weather = require('weather-js');
const axios = require("axios");
client.commands = new Discord.Collection()

let statuses =['Spying your PC...', 'Selling your passwords...', 'Using your credit card...'];

client.on('ready', () => {
  setInterval(function(){
    let status = statuses[Math.floor(Math.random()*statuses.length)];
    client.user.setPresence({game: {name: status}, status: 'dnd'});
    client.user.setPresence({activity: {name: status}, status: 'dnd'});

  }, 3000)
})


fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

jsfile.forEach((f, i) =>{
  let props = require(`./commands/${f}`);
  console.log(`${f} loaded`);
   client.commands.set(props.help.name, props);
});

});

client.on("message", async message => {
  //a little bit of data parsing/general checks
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;
  let content = message.content.split(" ");
  let command = content[0];
  let args = content.slice(1);
  let prefix = config.prefix;

  //checks if message contains a command and runs it
  let commandfile = client.commands.get(command.slice(prefix.length));
  if(commandfile) commandfile.run(client,message,args);
})
var prefix = config.prefix;

client.on("message", function(message) {
 
    var parts = message.content.split(" "); // Splits message into an array for every space, our layout: "<command> [search query]" will become ["<command>", "search query"]
 
    /* Simple command manager */
    if (parts[0] === "S-img") { // Check if first part of message is image command
 
        // call the image function
        image(message, parts); // Pass requester message to image function
 
    }
 
});
 
function image(message, parts) {
 
    /* extract search query from message */
 
    var search = parts.slice(1).join(" "); // Slices of the command part of the array ["!image", "cute", "dog"] ---> ["cute", "dog"] ---> "cute dog"
 
    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + search,
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };
    request(options, function(error, response, responseBody) {
        if (error) {
            // handle error
            return;
        }
 
        /* Extract image URLs from responseBody using cheerio */
 
        $ = cheerio.load(responseBody); // load responseBody into cheerio (jQuery)
 
        // In this search engine they use ".image a.link" as their css selector for image links
        var links = $(".image a.link");
 
        // We want to fetch the URLs not the DOM nodes, we do this with jQuery's .attr() function
        // this line might be hard to understand but it goes thru all the links (DOM) and stores each url in an array called urls
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
        console.log(urls);
        if (!urls.length) {
            // Handle no results
            return;
        }
 
        // Send result
        message.channel.send( urls[~~(Math.random() * 5)] );
    });

}

client.on("message", (message) => {
  
   if (!message.content.startsWith(prefix)) return;
   
     if (message.author.bot) return;
   
   const args = message.content.slice(prefix.length).trim().split(/ +/g);
   
     const command = args.shift().toLowerCase();
      

 if (message.content.startsWith(prefix +"8ball")){
    let response = ["Yes", "Maybe", "No", "Your question is complicated for me to answer", "Probably", "Definitely yes"," Obviously not! Do you really doubt it? :eyes:", "I don't think so", "Sure"];
    message.channel.send(`${response[~~(Math.random() * response.length)]}, ${message.author.username}.`);    
}


 if (message.content.startsWith(prefix +"dice")){
    let response = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "100"];
    message.channel.send(`${response[~~(Math.random() * response.length)]}`);    
}

if(message.content.startsWith(prefix + 'help')){
message.channel.send('**'+message.author.username+'**, Check your DMs');
message.author.send({embed: {
    color: 3447003,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "**BOT COMMANDS**",
    url: "https://discordapp.com/api/oauth2/authorize?client_id=573638296475926545&permissions=0&scope=bot",
    description: "The following list of commands is updated sometimes, so it's not a bad idea to check it again later.",
    fields: [{
        name: "S-user",
        value: "User information"
      },
      {
        name: "S-server",
        value: "Server information"
      },
      {
        name: "S-emojify",
        value: "Write something and this command convert it in emojis."
      },
      {
        name: "S-say",
        value: "It makes me say everything that you want"
      },
      {
        name: "S-avatar",
        value: "Use it to see the photo of any user."
      },
      {
        name: "S-flip",
        value: "Ԁlɐʎ ʍᴉʇɥ ʎonɹ ʇǝxʇs¡"
      },
      {
        name: "S-help",
        value: "All commands."
      },
      {
        name: "S-img",
        value: "Search images on the internet."
      },
      {
        name: "S-8ball",
        value: "Ask me anything and I will answer!"
      },
      {
        name: "S-ship",
        value: "Make beatiful couple!"
      },
      {
        name: "S-reddit",
        value: "I'll send some random images from different subreddits."
      },
      {
        name: "S-ascii",
        value: "Write something and I convert text to ASCII."
      },
      {
        name: "S-howgay",
        value: "See how proud you are!"
      },
      {
        name: "S-dice",
        value: "Random numbers from 1 to 100"
      },
      {
        name: "S-play",
        value: "A simple command to play music."
      },
      {
        name: "S-leave",
        value: "A simple command to leave the voice channel after the music."
      },
      {
        name: "S-weather [Country/City/Etc.]",
        value: "I can say you the updated weather of all the places on the world."
      },
      {
        name: "S-reminder",
        value: "I will remember to you anything you want after the time you specify for it."
      },
      {
         name: "Image Manipulation Commands",
         value: "S-beautiful, S-blood, S-bob, S-brazzers, S-gay, S-halloween, S-blur, S-captcha, S-invert, S-pixel, S-pokemon, S-posterize, S-sepia, S-treasure, S-jail, S-triggered, S-mission, S-checkout,S-shit,S-tattoo, S-wasted, S-hitler, S-challenger, S-hamood, S-superhot"
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "© Bonzi Team"
    }
  }
});
}


   if (message.content.startsWith(prefix +"server")){
        let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Info")
    .setColor("RANDOM")
    .setThumbnail(sicon)
    .addField("Server Name:", message.guild.name)
    .addField("Creation Date:", message.guild.createdAt)
    .addField("You Joined At", message.member.joinedAt)
    .addField("Total Members:", message.guild.memberCount);

      message.channel.send(serverembed);

}

    if (message.content.startsWith(prefix +"reddit")){
        let reddit = [
    "greentext",
    "creepyPMs",
    "softwaregore",
    "virginvschad",
    "me_irl",
    "PornhubComments",
    "EarthPorn",
    "Cyberpunk",
    "fakehistoryporn",
    "teenagers",
    "me_irl",
    "MurderedByWords",
    "4chan"
  ];

  let subreddit = reddit[Math.floor(Math.random() * reddit.length)];



  randomPuppy(subreddit).then(url => {
    snekfetch.get(url).then(async res => {
      await message.channel.send({
        files: [{
          attachment: res.body,
          name: 'reddit.png'
        }]
      });
    }).catch(err => console.error(err));
  }).catch(err => console.error(err));
};


if(message.content.startsWith(prefix + "ascii")){
      ascii.font(args.join(' '), 'Doom', function(rendered) {

        // Renders the image
        rendered = rendered.trimRight();

        // If args[0] is too long, display this
        if (rendered.length > 2000) return message.channel.send('Your message is too long!');

        // Sends the rendered message
        message.channel.send(rendered, {
            code: 'nd'
        });
    });
}

if (message.content.startsWith(prefix + 'weather')) { // This checks to see if the beginning of the message is calling the weather command.
        // You can find some of the code used here on the weather-js npm page in the description.

        weather.find({search: args.join(" "), degreeType: 'F'}, function(err, result) { // Make sure you get that args.join part, since it adds everything after weather.
            if (err) message.channel.send(err);

            // We also want them to know if a place they enter is invalid.
            if (result === undefined || result.length === 0) {
                message.channel.send('**Write a valid place**') // This tells them in chat that the place they entered is invalid.
                return; // This exits the code so the rest doesn't run.
            }

            // Variables
            var current = result[0].current; // This is a variable for the current part of the JSON output
            var location = result[0].location; // This is a variable for the location part of the JSON output

            // Let's use an embed for this.
            const embed = new Discord.RichEmbed()
                .setDescription(`**${current.skytext}**`) // This is the text of what the sky looks like, remember you can find all of this on the weather-js npm page.
                .setAuthor(`Weather from ${current.observationpoint}`) // This shows the current location of the weather.
                .setThumbnail(current.imageUrl) // This sets the thumbnail of the embed
                .setColor('RANDOM') // This sets the color of the embed, you can set this to anything if you look put a hex color picker, just make sure you put 0x infront of the hex
                .addField('Hour',`UTC${location.timezone}`, true) // This is the first field, it shows the timezone, and the true means `inline`, you can read more about this on the official discord.js documentation
                .addField('Type',location.degreetype, true)// This is the field that shows the degree type, and is inline
                .addField('Temperature',`${current.temperature} F`, true)
                .addField('Thermal Sensation', `${current.feelslike} F`, true)
                .addField('Wind',current.winddisplay, true)
                .addField('Humidity', `${current.humidity}%`, true)

                // Now, let's display it when called
                message.channel.send({embed});
        });
}

if(message.content.startsWith(prefix + 'user')){
    let userm = message.mentions.users.first()
    if(!userm){
      var user = message.author;

        const embed = new Discord.RichEmbed()
        .setThumbnail(user.avatarURL)
        .setAuthor(user.username+'#'+user.discriminator, user.avatarURL)
        .addField('Playing', user.presence.game != null ? user.presence.game.name : "Nothing", true)
        .addField('ID', user.id, true)
        .addField('Status', user.presence.status, true)
        .addField('Nickname', message.member.nickname, true)
        .addField('Created At', user.createdAt.toDateString(), true)
        .addField('Date of Entry', message.member.joinedAt.toDateString())
        .addField('Roles', message.member.roles.map(roles => `\`${roles.name}\``).join(', '))
        .setColor(0x66b3ff)

       message.channel.send({ embed });
    }else{
      const embed = new Discord.RichEmbed()
      .setThumbnail(userm.avatarURL)
      .setAuthor(userm.username+'#'+userm.discriminator, userm.avatarURL)
      .addField('Playing', userm.presence.game != null ? userm.presence.game.name : "Nothing", true)
      .addField('ID', userm.id, true)
      .addField('Status', userm.presence.status, true)
      .addField('Created At', userm.createdAt.toDateString(), true)
      .setColor(0x66b3ff)

     message.channel.send({ embed });
    }

  }



  if(message.content.startsWith(prefix +'say')){
  let texto = args.join(' ');
  if (!texto) return message.channel.send("I can't say anything if you don't specify it.");



message.channel.send(texto);

}


if (message.content.startsWith(prefix +"credits")){
  message.channel.send({embed: {
    color: 3447003,
    description: "**Owner**:\n Anti#9717\n **Developers**:\n a25#5333\n Gngax#1344\n Chijiro#3562"
  }});
}

  if(message.content.startsWith(prefix +'avatar')){
    
  let img = message.mentions.users.first()

if (!img) {
   
    const embed = new Discord.RichEmbed()
    .setImage(`${message.author.avatarURL}`)
    .setColor(0x66b3ff)
    .setFooter(`Avatar from ${message.author.username}#${message.author.discriminator}`);
    message.channel.send({ embed });

} else if (img.avatarURL === null) {
    //si el usuario no tiene avatar

    const embed = new Discord.RichEmbed()
    .setImage(`${message.author.defaultAvatarURL}`)
    .setColor(0x66b3ff)
    .setFooter(`Avatar from ${message.author.username}#${message.author.discriminator}`);
    message.channel.send({ embed });

} else {

    const embed = new Discord.RichEmbed()
    .setImage(`${img.avatarURL}`)
    .setColor(0x66b3ff)
    .setFooter(`Avatar from ${img.username}#${img.discriminator}`);
    message.channel.send({ embed });

};
  
}

});

client.on('guildMemberAdd', member => {
    let channel = member.guild.channels.find('name', 'join-leave');
    let memberavatar = member.user.avatarURL
        if (!channel) return;
        let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(memberavatar)
        .addField(':bust_in_silhouette: | Name : ', `${member}`)
        .addField('**:microphone2: | Hello!', `Welcome to the server!**, ${member}`)
        .addField(':id: | User :', "**[" + `${member.id}` + "]**")
        .addField(':family_mwgb: | You are the member n°', `${member.guild.memberCount}`)
        .addField("Name", `<@` + `${member.id}` + `>`, true)
        .addField('Server', `${member.guild.name}`, true )
        .setFooter(`**${member.guild.name}**`)
        .setTimestamp()

        channel.sendEmbed(embed);
});

client.on('guildMemberAdd', member => {

    console.log(`${member}`, "has joined" + `${member.guild.name}`)

});

client.on('guildMemberRemove', member => {
    let channel = member.guild.channels.find('name', 'join-leave');
    let memberavatar = member.user.avatarURL
        if (!channel) return;
        let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(memberavatar)
        .addField('Name:', `${member}`)
        .addField('left the server')
        .addField('Now the server has', `${member.guild.memberCount}` + " members")
        .setFooter(`**${member.guild.name}`)
        .setTimestamp()

        channel.sendEmbed(embed);
});

client.on('guildMemberRemove', member => {
    console.log(`${member}` + "has left" + `${member.guild.name}` + "Sending leave message now")
    console.log("Leave Message Sent")
});


client.login("YOUR_TOKEN");
