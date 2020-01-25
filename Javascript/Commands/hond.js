const discord = require("discord.js");
const superAgent = require("superagent");

module.exports.run = async (bot, message, args) => {

    var dog;

    dog = await superAgent
        .get("https://random.dog/woof.json");

    while (dog.body.url.endsWith(".webm") || dog.body.url.endsWith(".mp4")) {
        dog = await superAgent
            .get("https://random.dog/woof.json");
    }

    var embed = new discord.RichEmbed()
        .setColor("950ceb")
        .setTitle("Daggu :dog:")
        .setImage(dog.body.url);

    message.channel.send(embed);

}

module.exports.help = {
    name: "hond"
}