const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const Discord = require('discord.js');
const { Structures } = require('discord.js');
const botconfig = require("./botconfig.json");
const colors = require("./colors.json")
const ytdl = require('ytdl-core')
const Canvas = require("canvas")
const superagent = require("superagent")
const querystring = require("querystring")
const fetch = require('node-fetch')
const fs = require('fs')
const ffmpeg = require('ffmpeg');
const gis = require('g-i-s');


const bot = new CommandoClient({
    commandPrefix: '>',
    owner: '110824625511899136',
    invite: 'https://discord.gg/KCSUU9a',
});

Structures.extend('Guild', Guild => {
    class MusicGuild extends Guild {
      constructor(client, data) {
        super(client, data);
        this.musicData = {
          queue: [],
          isPlaying: false,
          volume: 1,
          songDispatcher: null
        };
      }
    }
    return MusicGuild;
  });


bot.registry
    .registerDefaultTypes()
    .registerGroups([
        ['moderation', 'Moderation'],
        ['economy', 'Economy'],
        ['help', 'Help'],
        ['fun', 'Fun'],
        ['music', 'Music']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));
bot
.on('error', console.error)
.on('warn', console.warn)
.on('ready', () => {
    console.log(`Client ready; logged in as ${bot.user.username}#${bot.user.discriminator} (${bot.user.id})`);
    bot.user.setActivity(`in ${bot.guilds.cache.size}  Discord servers!`);
})
.on('disconnect', () => { console.warn('Disconnected!'); })
.on('reconnecting', () => { console.warn('Reconnecting...'); })
.on('commandError', (cmd, err) => {
});

fs.readdir('./events/', (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
      if (!file.endsWith('.js')) return;
      const evt = require(`./events/${file}`);
      let evtName = file.split('.')[0];
      console.log(`Loaded event '${evtName}'`);
    });
});



bot.on('error', console.error);


bot.on('guildMemberAdd', async member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
	if (!channel) return;

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./welcome-image.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.font = '60px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(member.displayName, canvas.width / 2.5, canvas.height / 1.8);

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true)
    ctx.closePath();
    ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	// Move the image downwards vertically and constrain its height to 200, so it's a square
	ctx.drawImage(avatar, 25, 25, 200, 200);

    bot.on('guildMemberAdd', async member => {
      const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
      channel.send(`Hey!. **${member.username}**! Welcome to **${bot.guild.name}** We hope you enjoy your stay.`, attachment);
        const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
        if (!channel) return;
    
        const canvas = Canvas.createCanvas(700, 250);
        const ctx = canvas.getContext('2d');
    
        const background = await Canvas.loadImage('./welcome-image.jpg');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    
        ctx.strokeStyle = '#74037b';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
    
        ctx.font = '60px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(member.displayName, canvas.width / 2.5, canvas.height / 1.8);
    
        ctx.beginPath();
        ctx.arc(125, 125, 100, 0, Math.PI * 2, true)
        ctx.closePath();
        ctx.clip();
    
        const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
        // Move the image downwards vertically and constrain its height to 200, so it's a square
        ctx.drawImage(avatar, 200, 200, 200, 200);
    
        const lattachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.jpg');
    
        channel.send(lattachment);
    });
});


bot.login('NzE1NzI2OTkwODU3OTk0Mjkw.Xud1YQ.jsR-ysWdZAps7H6g73pB2v4VozE');
    
