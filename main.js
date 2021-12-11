const {
    Client,
    Attachment
} = require('discord.js');
const bot = new Client();

const token ='OTExNTQyNTg3NjU0MDI1MzA2.YZi6MA.fCKZa-8YTYvPiVoZ0c5Ux1-zNL8';

const PREFIX = '-';

var version ='1.2';

var servers = {};

const ytdl = require("ytdl-core");




bot.on('ready', () => {
    console.log('This bot is online ' + version);
});


bot.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]) {
        case 'play':


            function play(connection, message){
                var server = servers[message.guild.id];

                server.dispatcher = connection.play(ytdl(server.queue[0], {filter: "audioonly"}));

                server.queue.shift();

                server.dispatcher.on("end", function(){
                    if(server.queue[0]){
                        play(connection, message);
                    }

                    else{
                        connection.disconnect();
                    }
                })

            }


            if(!args[1]){
                message.channel.send("you need to provide a link!");
                return;
            }
            

            if(!message.member.voice.channel){
                message.channel.send("you ust be in a voice channel!");
                return;
            }

            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            }

            var server=servers[message.guild.id];

            server.queue.push(args[1]);


            if(!message.guild.voiceConnection) message.member.voice.channel.join().then(function(connection) {
                play(connection, message);
            })










        break;
    }

});

bot.login(token);

