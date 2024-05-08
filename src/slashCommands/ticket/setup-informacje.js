const { CommandInteraction, Client, EmbedBuilder } = require('discord.js');

// Wczytaj uprawnienia właściciela
const OWNER_ID = '620174926619475968';

module.exports = {
    name: 'setup-informacje',
    description: 'Wysyła wiadomość informacje',
    defaultPermission: false, // False - Nie mogą, True - Mogą
    clientPermissions: ["Administrator"],
    permissions: [
        {
            id: OWNER_ID,
            type: 'USER',
            permission: true,
        },
    ],
    run: async (client, interaction, args) => {
        // Tworzenie wbudowanego embeda
        const informacje = new EmbedBuilder()
                informacje.setThumbnail('https://cdn.discordapp.com/attachments/1182059023202259016/1233140824926191717/logo-betvon.png?ex=662c0363&is=662ab1e3&hm=4fa3791734866923a44a06bcf3d89faf96c11fd59697e260041f672fca0f2b58&')
                informacje.setAuthor({ name: `Informacja na temat rang za poziomy!`})
                informacje.setDescription("<:square_warning:1226896564304351354> **Informacja**\n> › Spis rang za odblokowanie poziomów za __aktywne__ pisanie na chat\n> › Rangi są nadawane __automatycznie__\n> ›  Poziomy są wyświetlane na __kanale__ <#1225485869893554237>\n\n<:iconio_stars:1224741787902672908> **Spis**\n<@&1224823576776020091> wymagany jest __5__ poziom!\n<@&1224823450540183692> wymagany jest __15__ poziom!\n<@&1224823453182459985> wymagany jest __25__ poziom!\n<@&1224823201637597286> wymagany jest __35__ poziom!\n<@&1224823202522333224> wymagany jest __45__ poziom!\n<@&1224823203185168434> wymagany jest __55__ poziom!\n<@&1224823205102096485> wymagany jest __65__ poziom!\n<@&1224823129503699028> wymagany jest __75__ poziom!\n<@&1224823039544524971> wymagany jest __85__ poziom!")
                informacje.setFooter({ text: 'www.betvon.pl | discord.gg/betvon | ig.betvon.pl', iconURL: 'https://cdn.discordapp.com/attachments/1182059023202259016/1233140824926191717/logo-betvon.png?ex=662c0363&is=662ab1e3&hm=4fa3791734866923a44a06bcf3d89faf96c11fd59697e260041f672fca0f2b58&' })
                informacje.setColor('#c97120');

       const channel = interaction.channel;

        // Wysłanie wiadomości z wbudowanym embedem
        await channel.send({ embeds: [informacje] });
    },
};