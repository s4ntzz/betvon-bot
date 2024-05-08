const client = require('../../index');
const { MessageEmbed } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ChannelType, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ButtonStyle } = require('discord.js');

module.exports = {
    name: "esportCreate"
};

client.on("interactionCreate", async (interaction) => {

    if (interaction.isButton()) {
        if (interaction.customId.startsWith(`setup-global-${interaction.guild.id}`)) {
            const id = interaction.customId.split('-')[3];

            const modal = new ModalBuilder()
                .setCustomId(`modal5-${interaction.guild.id}-${id}`)
                .setTitle(`Ticket Ogólny`);

            const ticketreason = new TextInputBuilder()
                .setCustomId(`ticket-global`)
                .setLabel("Jaką masz do nas sprawę?")
                .setPlaceholder("np: Straciłem poziom i rangę")
                .setStyle(TextInputStyle.Short)
                .setMinLength(5)
                .setMaxLength(500);

            const firstActionRow = new ActionRowBuilder().addComponents(ticketreason);

            modal.addComponents(firstActionRow);

            await interaction.showModal(modal);
        }

        if (interaction.customId.startsWith(`close-ticket-global`)) {
            try {
                await interaction.deferUpdate();
                const id = interaction.customId.split('-')[2];

                const user = interaction.guild.members.cache.get(`${id}`);
                const channel = interaction.guild.channels.cache.get(`${interaction.channel.id}`);

                if (!channel.permissionsFor(interaction.user.id).has("ManageChannels")) {
                    const perm = new EmbedBuilder()
                        .setColor('#fc5d5d')
                        .setAuthor({ name: `Brak dostępu do komendy!`, iconURL: "https://cdn.discordapp.com/emojis/1224741763680436368.webp?size=96&quality=lossless" })
                        .setDescription('Nie masz __uprawnień__ do użycia komendy dla __Administracji__')
                        .setFooter({ text: 'www.betvon.pl | discord.gg/betvon | ig.betvon.pl', iconURL: 'https://cdn.discordapp.com/attachments/1224368476928344077/1225150525675274312/sdasdasd.png?ex=66201557&is=660da057&hm=cc4cec393906f58e0b3a9ba64eac713403077cc553e31cbf2b53f85d2aac59f0&' });

                    return interaction.followUp({ embeds: [perm], ephemeral: true });
                }

                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId("close-ticket-global")
                            .setLabel(`Zamknij Ticket`)
                            .setEmoji("<:1f39f:1233141176685563955>")
                            .setStyle(ButtonStyle.Danger)
                            .setDisabled(true)
                    );

                interaction.editReply({
                    components: [row]
                });
                
                await channel.delete("");
            
            } catch (error) {
                console.error(error);
            }
        }
    }

    if (interaction.isModalSubmit()) {
        if (interaction.customId.startsWith(`modal5-${interaction.guild.id}`)) {
            const id = interaction.customId.split('-')[2];

            const reason = interaction.fields.getTextInputValue('ticket-global');

            const category = interaction.guild.channels.cache.get(`${id}`);

            await interaction.guild.channels.create({
                parent: category.id,
                name: `Ticket-${interaction.user.username}`,
                permissionOverwrites: [
                    {
                        id: interaction.user.id,
                        allow: ['SendMessages', 'ViewChannel'],
                    },
                    {
                        id: interaction.guild.roles.everyone,
                        deny: ['ViewChannel'],
                    },
                    {
                        id: client.user.id,
                        allow: ['ManageChannels']
                    }
                ],
                type: ChannelType.GuildText,
            }).then(async c => {
                interaction.reply({
                    content: `Twój Ticket został utworzony na kanale: <#${c.id}>`,
                    ephemeral: true
                }).then(sentMessage => {
                    setTimeout(() => {
                        sentMessage.delete();
                    }, 5000);
                });

                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`close-ticket-global-${interaction.user.username}`)
                            .setLabel(`Zamknij Ticket`)
                            .setEmoji("<:1f39f:1233141176685563955>")
                            .setStyle(ButtonStyle.Danger)
                    );

                const embed = new EmbedBuilder()
                    .setThumbnail('https://cdn.discordapp.com/attachments/1224368476928344077/1225150525675274312/sdasdasd.png')
                    .setAuthor({ name: `Ticket użytkownika ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
                    .setDescription("<:iconio_ticket:1228014087385120809> **Informacje o Ticketach**\n> › Jeżeli chcesz aby __Twój__ ticket został zamknięty poinformuj __administratora__\n> › Staraj się nie __pingować__ administracji!\n> › Bądź cierpliwy. Przypomnienie! Administracja ma __24h__ na odpowiedź")
                    .setFooter({ text: 'www.betvon.pl | discord.gg/betvon | ig.betvon.pl', iconURL: 'https://cdn.discordapp.com/attachments/1182059023202259016/1233140824926191717/logo-betvon.png?ex=662c0363&is=662ab1e3&hm=4fa3791734866923a44a06bcf3d89faf96c11fd59697e260041f672fca0f2b58&' })
                    .addFields(
                        { name: "\n<:iconio_card:1224741756017315881> Sprawa z która przychodzę", value: `> › __${reason}__` }
                    )
                    .setColor('#c97120');

                c.send({
                    content: `${interaction.user}`,
                    components: [row],
                    embeds: [embed]
                });
            });
        }
    }
});