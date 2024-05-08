const { Permissions, EmbedBuilder } = require('discord.js');
const client = require('../../index');


// Tutaj możesz podać identyfikatory właścicieli jako tablicę
const OWNER_IDS = ['620174926619475968', '776863489917845505', '1050090137742233633', '1218679171572826183', `1040940644102852629`, '1040940644102852629'];


module.exports = {
    name: "interactionCreate"
};

client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.slash.get(interaction.commandName);

    if (!command) return;

    try {
        // Sprawdź, czy identyfikator użytkownika interakcji znajduje się na liście właścicieli
        if (!OWNER_IDS.includes(interaction.user.id)) {
            // Jeśli użytkownik nie jest właścicielem, odrzuć interakcję
        const perm2 = new EmbedBuilder()
            perm2.setColor('#fc5d5d')
            perm2.setAuthor({ name: `Brak dostępu do komendy!`, iconURL: "https://cdn.discordapp.com/emojis/1224741763680436368.webp?size=96&quality=lossless" })
            perm2.setDescription('Nie masz __uprawnień__ do użycia komendy dla __Administracji__')
            perm2.setFooter({ text: 'www.betvon.pl | discord.gg/betvon | ig.betvon.pl', iconURL: 'https://cdn.discordapp.com/attachments/1224368476928344077/1225150525675274312/sdasdasd.png?ex=66201557&is=660da057&hm=cc4cec393906f58e0b3a9ba64eac713403077cc553e31cbf2b53f85d2aac59f0&' })

        return interaction.reply({ embeds: [perm2] });
    }

        if (command.userPermissions) {
            const missingPermissions = interaction.member.permissions.missing(command.userPermissions);
            if (missingPermissions.length) {
                const embed2 = new EmbedBuilder()
                    .setTitle(`Required Permissions`)
                    .setDescription(`${interaction.user}, you don't have the required permissions to use this command.`)
                    .addField(`Missing Permissions`, missingPermissions.map(p => `\`${p}\``).join(", "))
                    .setColor(`#2f3136`);
                return interaction.reply({ embeds: [embed2], ephemeral: true });
            }
        }

        if (command.botPermissions) {
            const missingPermissions = interaction.guild.me.permissions.missing(command.botPermissions);
            if (missingPermissions.length) {
                const embed1 = new EmbedBuilder()
                    .setTitle(`Required Permissions`)
                    .setDescription(`I don't have the required permissions to run this command.`)
                    .addField(`Missing Permissions`, missingPermissions.map(p => `\`${p}\``).join(", "))
                    .setColor(`#2f3136`);
                return interaction.reply({ embeds: [embed1], ephemeral: true });
            }
        }

        await command.run(client, interaction, interaction.options);
    } catch (err) {
        console.error(err);
       const perm3 = new EmbedBuilder()
            perm3.setColor('#fc5d5d')
            perm3.setAuthor({ name: `Brak dostępu do komendy!`, iconURL: "https://cdn.discordapp.com/emojis/1224741763680436368.webp?size=96&quality=lossless" })
            perm3.setDescription('Nie masz __uprawnień__ do użycia komendy dla __Administracji__')
            perm3.setFooter({ text: 'www.betvon.pl | discord.gg/betvon | ig.betvon.pl', iconURL: 'https://cdn.discordapp.com/attachments/1224368476928344077/1225150525675274312/sdasdasd.png?ex=66201557&is=660da057&hm=cc4cec393906f58e0b3a9ba64eac713403077cc553e31cbf2b53f85d2aac59f0&' })
        return interaction.reply({ embeds: [perm3], ephemeral: true });
    }
});