const client = require('../index');
const config = require("../config/config.json");
const { REST, Routes } = require('discord.js');
const fs = require('fs')
const colors = require('colors');

module.exports = async () => {
    console.log("┣ Ładowanie Komend...\n".blue.bold);

    const slash = [];

    fs.readdirSync('./src/slashCommands/').forEach(dir => {
        const commands = fs.readdirSync(`./src/slashCommands/${dir}`).filter(file => file.endsWith('.js'));
        for (let file of commands) {
            let pull = require(`../slashCommands/${dir}/${file}`);

            if (pull.name) {
                slash.push(pull)
                client.slash.set(pull.name, pull);
                console.log(`┣ Zaladowano komende ${pull.name}`.white);

            } else {
                console.log(`[SLASH] Nie można załadować pliku ${file}, brak wartości nazwy modułu.`.red)
                continue;
            }
        }
    });

    if (!config.CLIENTID) {
        console.log("[BŁĄD] Musisz podać swój identyfikator klienta w pliku konfiguracyjnym".red + "\n");
        return process.exit()
    };

    const rest = new REST({ version: '10' }).setToken(config.TOKEN);

    await rest.put(
        Routes.applicationCommands(config.CLIENTID),
        { body: slash }
    ).then(() => {
        console.log("\n┣ Ładowanie Slashów...\n".blue.bold);
        console.log(`┣ Wszystkie slashe zostały poprawnie zainstalowane`);

    })
}