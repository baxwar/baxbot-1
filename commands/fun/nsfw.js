const { Command } = require('discord.js-commando');
const  gis = require('g-i-s');
const Discord = require('discord.js');
const randomPuppy = require('random-puppy');
const errors = require('../../assets/json/errors');
const subreddits = [
    "nsfw",
    "porn",
    "BonerMaterial",
    "adorableporn",
    "nsfw2",
    "Sexy",
    "NSFW_nospam"
]


module.exports = class NSFWCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'nsfw',
            aliases: ['porn'],
            group: 'fun',
            memberName: 'nsfw',
            guildOnly: true,
            description: 'Finds porn for you!',
            details: 'This command can only be used in NSFW channels!',
            examples: ['~nsfw'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    run(message) {
        gis({
            searchTerm: "penis",
            queryStringAddition: '&safe=off&thisIS=aBot'
          }, async (err, result) => {
              var obj = result[Math.floor(Math.random() * result.length)]["url"];
                  message.channel.send(obj);
              });
    }
}