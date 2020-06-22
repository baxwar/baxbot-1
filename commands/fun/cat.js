const commando = require('discord.js-commando');
const Discord = require('discord.js');
const querystring = require('query-string');
const r2 = require('r2');
const CAT_API_URL = 'https://api.thecatapi.com/';
const CAT_API_KEY   = "abd37ea7-331f-4a1b-821c-4fbdde0c499b";

module.exports = class DogCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'cat',
            group: 'fun',
            memberName: 'cat',
            description: 'Meow.',
        });
    }
    
    async run(message, args) {
      try{
        var images = await this.loadImage(message.author.username);
    
        var image = images[0];
    
        console.log('message processed','showing image.id:',image.id)
        message.channel.send({files: [ image.url ] } );
    
      }catch(error)
      {
        console.log(error)
      }
    }

    async loadImage(sub_id)
    {

      var headers = {
          'X-API-KEY': CAT_API_KEY,
      }
      var query_params = {
        //'has_breeds':true,
        'mime_types':'jpg,png',
        'size':'med',  
        'sub_id': sub_id, 
        'limit' : 1
      }

      let queryString = querystring.stringify(query_params);
    
      try {
        let _url = CAT_API_URL + `v1/images/search?${queryString}`;
        var response = await r2.get(_url , {headers} ).json
      } catch (e) {
          console.log(e)
      }
      return response;
    }
}