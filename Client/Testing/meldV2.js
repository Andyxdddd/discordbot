const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    message.delete();

    if (!message.member.hasPermission("MANAGE_MESSAGES")) {

        var err = new discord.RichEmbed()

        .setColor("2C2F33")
            .addField("**Er is iets fout gegaan! 😕**", "*Je hebt geen toestemming*");

        return message.channel.send(err).then(msg => msg.delete(4000));

    }

    var splitser = "//";

    if (args[0] == null) {

        var useMesagge = new discord.RichEmbed()

        .setColor("2C2F33")
            .setDescription(`!meld **Bericht** ${splitser} **URL**`)
            .addField(`**Er is iets fout gegaan! 😕**`, "*Geen* **Mededeling** *meegegeven, gelieve een idee mee te geven.*  |  !meld + bericht");
        return message.channel.send(useMesagge).then(msg => msg.delete(25000));

    }

    args = args.join(" ").split(splitser);

    var options = {

        bericht: args[0] || "No content specified",
        link: args[1] || ""

    }

    //"https://i.imgur.com/rNz0Wwj.png"

    var announcementEmbed = new discord.RichEmbed()

    .setColor("005fff")
        .setDescription(`**Mededeling Hometown Roleplay V2 Beta2 | @everyone **\n\n${options.bericht}\n\n`)
        .setImage(`${options.link}`);

    var announcementChannel = message.guild.channels.find(`name`, "mededelingen");

    if (!announcementChannel) return message.channel.send("Invalid Channel");

    announcementChannel.send(announcementEmbed);

}

module.exports.help = {
    name: "meldv2"
}