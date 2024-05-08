const fs = require('fs');
const colors = require('colors');

module.exports = (client) => {
    console.log("\n┣ Ładowanie Eventów...\n".blue.bold);

    fs.readdirSync('./src/events/').forEach(dir => {
        const commands = fs.readdirSync(`./src/events/${dir}`).filter(file => file.endsWith('.js'));
        for (let file of commands) {
            let pull = require(`../events/${dir}/${file}`);
            if (pull.name) {
                client.events.set(pull.name, pull);
                console.log(`┣ Załadowano Event: ${pull.name}`.white)
            } else {
                console.log("\n" + "----------------------------------------".red)
                console.log(`[EVENTS] Nie można załadować pliku ${file}, brak nazwy lub aliasów`.red.bold)
                console.log("----------------------------------------".red)
                continue;
            }
        }
    })
    console.log(" ");
}

