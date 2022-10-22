const {
    Client,
    EmbedBuilder,
    ActivityType,
    GatewayIntentBits,
    Partials,
    Collection
} = require("discord.js");
const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
    partials: [Partials.Channel],
});
const config = require("./config.json");
client.login(config.token);
  
const cooldown = new Collection();

client.on("ready", () => {
    console.log(`${client.user.tag} logined!`);

    client.user.setActivity('Made By w.#1337', {
        type: ActivityType.Playing
    });
    
});

client.on("messageCreate", (message) => {
    if (message.content.startsWith(".mines")) {

        if (message.author.id != "owner id") { 
            let now = Date.now();

            if (cooldown.has(message.author.id)) {
                let expiration = cooldown.get(message.author.id) + 5000;

                if (now < expiration) {
                    let left = (expiration - now) / 1000;
                    return message.reply({
                        content: `Before using the command ${left.toFixed(1)} wait seconds.`
                    }).then(m => {
                        setTimeout(() => {
                            m.delete();
                        }, 3000);
                    });
                }
            };

            cooldown.set(message.author.id, now);
            setTimeout(() => cooldown.delete(message.author.id), 5000);
        }

        let embed = new EmbedBuilder();

        let list = ["❌", "❌", "❌", "❌", "❌", "❌", "❌", "❌", "❌", "❌", "❌", "❌", "❌", "❌", "❌", "❌", "❌", "❌", "❌", "❌", "❌", "✅", "✅", "✅", "✅"]; // Made By w.#1337
        list = list.map(value => ({
                value,
                sort: Math.random()
            }))
            .sort((a, b) => a.sort - b.sort)
            .map(({
                value
            }) => value);

        list.splice(5, 0, "\n");
        list.splice(11, 0, "\n");
        list.splice(17, 0, "\n");
        list.splice(23, 0, "\n");

        embed.setDescription(`**w. Predictions**`) 
        .setThumbnail ("https://cdn.discordapp.com/avatars/770526232646516737/5191eca55ff0cf4ccb80d383bcd72a0b.webp?size=80");

        embed.addFields({
            name: `**Prediction**`,
            value: "```" + list.join("") + "```"
        }, {
            name: `**Accuracy**`,
            value: "```" + Math.floor(Math.random() * 100) + "%```"
        });


        message.channel.send({
            embeds: [embed]
        });
    };
});
