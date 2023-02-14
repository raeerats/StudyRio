const {REST, Routes} = require("discord.js")

//dotenv
const dotenv = require('dotenv')
dotenv.config()
const {TOKEN, CLIENT_ID, GUILD_ID} = process.env;// solicitando as informações privadas do cliente

// importação dos comandos
const fs = require("node:fs")
const path = require("node:path")
const commandsPath = path.join(__dirname, "commands")
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

const commands = []

for (const file of commandsFiles) {
    const command = require(`./commands/${file}`)
    commands.push(command.data.toJSON())
}

//Instancia REST
const rest = new REST({version: "10"}).setToken(TOKEN);

//DEPLOY
(async () => {
    try {
        console.log(`Resentando ${commands.length} comandos...`)
        //PUT
        const data = await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            {body: commands}
        )
            console.log("Comandos registrados com sucesso!")
    }
    catch (error) {
        console.error(error)
    }
})()