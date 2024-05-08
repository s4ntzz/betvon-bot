const { CommandInteraction, Client, EmbedBuilder } = require('discord.js');

// Wczytaj uprawnienia właściciela
const OWNER_ID = '620174926619475968';

module.exports = {
    name: 'setup-boost',
    description: 'Wysyła wiadomość regulamin',
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
        const boost = new EmbedBuilder()
            boost.setColor('#c97120')
            boost.setAuthor({ name: `Co oferujemy za boosty na naszym serwerze?`})
            boost.setDescription("<:square_warning:1226896564304351354> **Informacje na temat rangi** <@&1224465788673593347>\n> › Aby odebrać __nagrodę__ stwórz ticket na kanale <#1224458705630658681>\n> › Przykład stworzenia ticketu. __2 boosty - własna rola z emotką__\n> › Jeżeli utracisz jakiś przywilej __natychmiast__ to zgłoś!\n\n<a:nitrooo:1225878402167345233> **Nagrody do wybrania** __``(1 boost)``__\n> › Możliwość ustawienia własnego __koloru__ nickname\n> › Częste konkursy dla __Boosterów__\n> › +40% __expa__ do następnego poziomu\n\n<a:nitrooo:1225878402167345233> **Nagrody do wybrania** __``(2 boosty)``__\n> › Stworzenie własnej __rangi__ z __kolorkiem__ i __emotką__\n> › Częste konkursy dla __Boosterów__\n> › +40% __expa__ do następnego poziomu\n\n<a:nitrooo:1225878402167345233> **Zniżki** __``(1 boost)``__\n> › Płatna oferta  (**-15% na zakup**)\n\n<a:nitrooo:1225878402167345233> **Zniżki** __``(2 boosty)``__\n> › Płatna oferta  (**-25% na zakup**)")
            boost.setThumbnail('https://cdn.discordapp.com/attachments/1182059023202259016/1233140824926191717/logo-betvon.png?ex=662c0363&is=662ab1e3&hm=4fa3791734866923a44a06bcf3d89faf96c11fd59697e260041f672fca0f2b58&')
            boost.setFooter({ text: 'www.betvon.pl | discord.gg/betvon | ig.betvon.pl', iconURL: 'https://cdn.discordapp.com/attachments/1182059023202259016/1233140824926191717/logo-betvon.png?ex=662c0363&is=662ab1e3&hm=4fa3791734866923a44a06bcf3d89faf96c11fd59697e260041f672fca0f2b58&' })

       const channel = interaction.channel;

        // Wysłanie wiadomości z wbudowanym embedem
        await channel.send({ embeds: [boost] });
    },
};