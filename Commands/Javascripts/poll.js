const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var idee = args.join(" ");

    var user = message.author;

    //if (!idee) return message.channel.send("Geen Idee meegegeven gelieve een idee mee te geven.");

    if (!args[0]) {

        var err = new discord.RichEmbed()

            .setColor("0x333333")
            .addField(`**Er is iets fout gegaan! 😕**`, "*Geen Idee meegegeven, gelieve een idee mee te geven.*");

        return message.channel.send(err).then(msg => msg.delete(5000));
    }

    var ideeEmbed = new discord.RichEmbed()

        .setColor("#2C2F33")

        .setAuthor(`${user.username} heeft een poll gemaakt om:`, `${user.avatarURL}`)

        .setDescription(`\n${idee}\n`)

        .setFooter('!poll + bericht  |  om jouw idee met de mensen te delen.');

    var ideeChannel = message.guild.channels.find(`name`, "🧩poll-suggestie");

    if (!ideeChannel) return message.guild.send("Kan het kanaal niet vinden");

    ideeChannel.send(ideeEmbed).then(message => {

        message.react('698550597414289499')

            .then(() => message.react('698550597888245770'))
            .then(() => message.react('698550597816680498'))
            .catch(() => console.error('Een van de emoji reageerde niet.'));

    });

    message.delete();

}

module.exports.help = {
    name: "poll"
}