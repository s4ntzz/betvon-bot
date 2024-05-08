const { Client, CommandInteraction, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

// Wczytaj uprawnienia właściciela
const OWNER_ID = '620174926619475968';

let verificationData = null;

// Przypisz uprawnienia dla komendy
module.exports = {
    name: 'setup-weryfikacja',
    description: 'Weryfikacja serwerowa',
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
        try {
            const embed = new EmbedBuilder()
                .setThumbnail('https://cdn.discordapp.com/attachments/1182059023202259016/1233140824926191717/logo-betvon.png?ex=662c0363&is=662ab1e3&hm=4fa3791734866923a44a06bcf3d89faf96c11fd59697e260041f672fca0f2b58&')
                .setAuthor({ name: `Zweryfikuj swoje konto aby zobaczyć więcej!` })
                .setDescription("> › Dziękujemy, że __wybrałeś__ właśnie nasz serwer!\n> › Aby __zweryfikować__ swoje konto, kliknij poniższy __przycisk__")
                .setFooter({ text: 'www.betvon.pl | discord.gg/betvon | ig.betvon.pl', iconURL: 'https://cdn.discordapp.com/attachments/1182059023202259016/1233140824926191717/logo-betvon.png?ex=662c0363&is=662ab1e3&hm=4fa3791734866923a44a06bcf3d89faf96c11fd59697e260041f672fca0f2b58&' })
                .setColor('#c97120');

        const verifyButton = new ButtonBuilder()
            .setLabel("Zweryfikuj się!")
            .setStyle(ButtonStyle.Success)
            .setEmoji("1233138495485116599")
            .setCustomId("Verify");

        const row = new ActionRowBuilder()
            .addComponents(verifyButton);

        await interaction.channel.send({ embeds: [embed], components: [row] });

        const filter = i => i.customId === 'Verify' && i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async i => {
            await i.reply({ content: "<:iconio_download:1224741769086763111> Gratulacje! Zostałeś zweryfikowany. Twoja rola została Ci przyznana!", ephemeral: true });

            const role = i.guild.roles.cache.get("1224465218894172221"); // ID Roli do nadania
            const member = i.member;
            await member.roles.add(role);
            collector.stop();
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                interaction.followUp({ content: 'Czas na weryfikację minął.', ephemeral: true });
                }
            });
        } catch (error) {
            console.error(error);
        }
    }
};