const { CommandInteraction, Client, EmbedBuilder } = require('discord.js');

// Wczytaj uprawnienia właściciela
const OWNER_ID = '620174926619475968';

module.exports = {
    name: 'setup-regulamin',
    description: 'regulamin',
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
        const regulamin = new EmbedBuilder()
                regulamin.setThumbnail('https://cdn.discordapp.com/attachments/1182059023202259016/1233140824926191717/logo-betvon.png?ex=662c0363&is=662ab1e3&hm=4fa3791734866923a44a06bcf3d89faf96c11fd59697e260041f672fca0f2b58&')
                regulamin.setAuthor({ name: `Regulamin serwera BETVON.PL`})
                regulamin.setDescription("<:7057checkmark:1226894321006149703> **ZASADY OGÓLNE**\n> __1.__ Nieprzestrzeganie poniższego regulaminu wiąże się z otrzymaniem ostrzeżenia, __wyrzucenia lub bana. __\n> __2.__ Nieznajomość regulaminu nie zwalnia z jego  __przestrzegania. __\n> __3.__ Administracja ma pełne prawa do  __zmieniania treści regulaminu __ bez wcześniejszego powiadomienia  __użytkowników. __\n> __4.__ Poza obowiązującym regulaminem należy pamiętać o przestrzeganiu  __wytycznych społeczności Discord __.\n\n<:7057checkmark:1226894321006149703> **ZASADY KANAŁÓW**\n> __1.__ Zakazane jest  __spamowanie __ i  __floodowanie __\n> __2.__ Zabrania się pisania wielkimi literami. (__CAPSLOCK__)\n> __3.__ Wulgaryzmy dozwolone lecz z  __umiarem __\n> __4.__ Zakazane jest prowokowanie do kłótni lub dyskusji które mają negatywny wpływ na  __wizerunek serwera. __\n> __5.__ Zakaz  __wykorzystywania __,  __oszukiwania __ i  __szantażowania __ innych użytkowników.\n> __6.__ Zabroniony jest wszelkiego rodzaju  __trolling __ oraz inne formy zachowań  __anty społecznych. __\n> __7.__ Reklamowanie jakichkolwiek  __serwerów/stron__ itd. jest nie dozwolone bez uprzedniej  __zgody administratora. __\n> __8.__ Podszywanie się pod administrację będzie skutkowało  __natychmiastowym banem. __")
                regulamin.setFooter({ text: 'www.betvon.pl | discord.gg/betvon | ig.betvon.pl', iconURL: 'https://cdn.discordapp.com/attachments/1182059023202259016/1233140824926191717/logo-betvon.png?ex=662c0363&is=662ab1e3&hm=4fa3791734866923a44a06bcf3d89faf96c11fd59697e260041f672fca0f2b58&' })
                regulamin.setColor('#c97120');

       const channel = interaction.channel;

        // Wysłanie wiadomości z wbudowanym embedem
        await channel.send({ embeds: [regulamin] });
    },
};