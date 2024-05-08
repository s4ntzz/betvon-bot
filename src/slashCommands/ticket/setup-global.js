const { Client, CommandInteraction, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, AttachmentBuilder, ApplicationCommandOptionType, ChannelType } = require('discord.js');

// Wczytaj uprawnienia właściciela
const OWNER_ID = '620174926619475968';

module.exports = {
    name: 'setup-global',
    description: "Tworzy Ticket Ogólny",
    defaultPermission: false, // False - Nie mogą, True - Mogą
    clientPermissions: ["Administrator"],
    permissions: [
        {
            id: OWNER_ID,
            type: 'USER',
            permission: true,
        },
    ],
    options: [
        {
            name: "channel",
            description: "Wybierz kanał na, którym ma się pojawić embed!",
            type: ApplicationCommandOptionType.Channel,
            required: true
        },
        {
            name: "category",
            description: "Wybierz kategorię w, której jest kanał!",
            type: ApplicationCommandOptionType.Channel,
            required: true
        }
    ],

    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction
     * @param {String[]} args 
     */

    run: async (client, interaction, args) => {
        const data = interaction.options.getChannel("channel");
        const data2 = interaction.options.getChannel("category")

        const channel = interaction.guild.channels.cache.get(`${data.id}`);
        const category = interaction.guild.channels.cache.get(`${data2.id}`)

        // Sprawdza czy kanał jest widoczny dla bota
        if (!channel.viewable) {
            return interaction.reply({
                content: "Podany kanał jest niewidoczny!",
                ephemeral: true
            })
        }

        // Sprawdza czy kategoria jest widoczna dla bota
        if (category.type !== ChannelType.GuildCategory) {
            return interaction.reply({
                content: "Podana kategoria jest niewidoczna!",
                ephemeral: true
            })
        }

        // Sprawdz czy kategoria jest widoczna dla bota
        if (!category.viewable) {
            return interaction.reply({
                content: "Podana kategoria jest niewidoczna!",
                ephemeral: true
            })
        }

        if (!category.permissionsFor(client.user.id).has("ManageChannels")) {
            return interaction.reply({
                content: "Bot nie posiada uprawnień do stworzenia kanału Ticket!",
                ephemeral: true
            })
        }

        // Tworzy przycisk 
        const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`setup-global-${interaction.guild.id}-${category.id}`)
                    .setLabel('Stwórz Ticket')
                    .setEmoji("<:1f39f:1233141176685563955>")
                    .setStyle(ButtonStyle.Success),
            );

        // Tworzy Embed
        const ticketglobal = new EmbedBuilder()
            ticketglobal.setColor('#c97120')
            ticketglobal.setAuthor({ name: `Masz dla nas jakąś sprawę? Stwórz Ticket!`})
            ticketglobal.setDescription("<:square_warning:1226896564304351354> **Informacje** \n> › Kliknij poniższy przycisk. I __poinformuj__ nas jaką masz dla nas sprawę!\n> › Administracja odpowiada na __tickety__ w ciągu __24h__\n> › Żartobliwe tworzenie __ticketów__ będzie karane!")
            ticketglobal.setThumbnail('https://cdn.discordapp.com/attachments/1224368476928344077/1225150525675274312/sdasdasd.png')
            ticketglobal.setFooter({ text: 'www.betvon.pl | discord.gg/betvon | ig.betvon.pl', iconURL: 'https://cdn.discordapp.com/attachments/1182059023202259016/1233140824926191717/logo-betvon.png?ex=662c0363&is=662ab1e3&hm=4fa3791734866923a44a06bcf3d89faf96c11fd59697e260041f672fca0f2b58&' })

        // Wysyła wiadomość po kliknięciu przycisku!
        await interaction.reply({
            content: `Utworzyłeś Embed z Ticketem na kanale: ${channel}`,
            ephemeral: true
        })

        channel.send({
            embeds: [ticketglobal],
            components: [button]
        })
    }
}