const client = require('../../index');
const colors = require('colors');

module.exports = {
    name: "ready"
};

client.once('ready', async () => {
    console.log("\n┣ Włączanie Bota...\n".blue.bold);
    console.log(`┣ ${client.user.tag} został poprawnie włączony!`.bold)
        client.user.setPresence({
        status: 'dnd',
        activities: [{
            name: 'www.betvon.pl', 
            type: 'PLAYING'         // Możesz zmienić na 'PLAYING', 'LISTENING' lub 'STREAMING'
        }]
    });
});