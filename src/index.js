require('./console/watermark')
const { Client, Partials, Collection, EmbedBuilder } = require('discord.js');
const colors = require('colors');
const config = require('./config/config.json')

const client = new Client({
    intents: [
        "Guilds",
        "GuildMessages",
        "GuildPresences",
        "GuildMembers",
        "GuildMessageReactions",
        "DirectMessages",
        "MessageContent",
        "GuildVoiceStates"
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember,
        Partials.Reaction
    ]
})

if (!config.TOKEN) {
    console.log("[INFO-WARN] Wymagany jest token Twojego bota. Sprawdź config".yellow.bold + "\n")
    return process.exit();
};

client.commands = new Collection()
client.events = new Collection()
client.slash = new Collection()
client.aliases = new Collection()
client.config = require("./config/config.json")

module.exports = client;

["event", "slash"].forEach(file => {
    require(`./handlers/${file}`)(client);
});

client.login(config.TOKEN)
    .catch((err) => {
        console.log("[BŁĄD] Coś poszło nie tak z łączeniem bota" + "\n");
        console.log("[BŁĄD] Błąd związany z DiscordAPI :" + err);
        process.exit();
    })

    client.on('guildMemberAdd', member => {
    const channelId = '1224456984208871466';
    const channel = member.guild.channels.cache.get(channelId);

    if (!channel) return console.error('Kanał został nieznaleziony');

    const powitanie = new EmbedBuilder()
        powitanie.setColor('#c97120')
        powitanie.setAuthor({ name: 'Dołączył do nas nowy użytkownik. Powitajmy go!'})
        powitanie.setDescription(`Dziękujemy, że do nas dołączyłeś ${member}! Mamy nadzieję, że zostaniesz z nami na dłużej!. Pozdrawiamy __BETVON POLSKA__`)
        powitanie.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        powitanie.setFooter({ text: 'www.betvon.pl | discord.gg/betvon | ig.betvon.pl', iconURL: 'https://cdn.discordapp.com/attachments/1182059023202259016/1233140824926191717/logo-betvon.png?ex=662c0363&is=662ab1e3&hm=4fa3791734866923a44a06bcf3d89faf96c11fd59697e260041f672fca0f2b58&' });

    channel.send({ embeds: [powitanie] })
        .then(() => console.log('Wiadomość powitalna została wysłana'))
        .catch(error => console.error('Błąd przy wysyłaniu wiadomości powitalnej', error));
});

process.on("unhandledRejection", async (err) => {
    console.log(`[ANTY - BŁĄD] Nieobsługiwane : ${err.stack}`)
})