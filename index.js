const discord = require("discord.js");
const botConfig = require("./botconfig.json");
const fs = require("fs");
const bot = new discord.Client();
bot.commands = new discord.Collection();

fs.readdir("./Js/Commands/", (err, files) => {
  if (err) console.log(err);
  var jsFiles = files.filter(f => f.split(".").pop() === "js");
  if (jsFiles.length <= 0) {
    console.log("script not found!");
    return;
  }

  jsFiles.forEach((f, i) => {
    var fileGet = require(`./Js/Commands/${f}`);

    //console.log(`${f} are now loaded`);

    bot.commands.set(fileGet.help.name, fileGet);
  });
});

fs.readdir("./Js/Temp/", (err, files) => {
  if (err) console.log(err);
  var jsFiles = files.filter(f => f.split(".").pop() === "js");
  if (jsFiles.length <= 0) {
    console.log("script not found!");
    return;
  }

  jsFiles.forEach((f, i) => {
    var fileGet = require(`./Js/Temp/${f}`);

    //console.log(`${f} are now loaded`);

    bot.commands.set(fileGet.help.name, fileGet);
  });
});

bot.on("ready", async () => {

  console.log(`${bot.user.username} is online!`);

  //bot.user.setActivity("the server", { type: "Streaming" });

});

bot.on("message", async message => {

  if (message.author.bot) return;

  if (message.channel.type === "dm") return;

  var messageArrey = message.content.split(" ");

  var prefix = botConfig.prefix;

  var command = messageArrey[0];

  var arguments = messageArrey.slice(1);

  var commands = bot.commands.get(command.slice(prefix.length));

  if (command) commands.run(bot, message, arguments);

  try {
    null.f()
  } catch (e) {
    console.log(e instanceof TypeError)  // true
    console.log(e.message)               // "null has no properties"
    console.log(e.name)                  // "TypeError"
    console.log(e.fileName)              // "Scratchpad/1"
    console.log(e.lineNumber)            // 2
    console.log(e.columnNumber)          // 2
    console.log(e.stack)                 // "@Scratchpad/2:2:3\n"
  }

});

bot.login(process.env.token);
