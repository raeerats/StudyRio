const { Client, Events, GatewayIntentBits, Collection } = require('discord.js')

// dotenv
const dotenv = require('dotenv')
dotenv.config()
const { TOKEN } = process.env

// importação dos comandos
const fs = require("node:fs")
const path = require("node:path");
const commandsPath = path.join(__dirname, "commands")
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))


const client = new Client({ intents: [GatewayIntentBits.Guilds] })
client.commands = new Collection()

for(const file of commandsFiles) {
	const filePath = path.join(commandsPath, file)
	const command = require(filePath)
	if ("data" in command && "execute" in command){
		client.commands.set(command.data.name, command)
	} else {
		console.log(`Essse comando em ${filePath} esta com "data" ou "execute"`)
	}
}

// Login do bot
client.once(Events.ClientReady, c => {
	console.log(`Futaba is read to hear you! ${c.user.tag}`)
});
client.login(TOKEN)

//Listener de interações com o Bot
client.on(Events.InteractionCreate, async interaction => {
	if(interaction.isStringSelectMenu()) {
		const selected = interaction.values[0]
		if (selected == "javascript"){
            await interaction.reply("Documentação do Javascript: https://developer.mozilla.org/en-US/docs/Web/JavaScript")
        } else if (selected == "python"){
            await interaction.reply("Documentação do Python: https://www.python.org")
        } else if (selected == "java"){
            await interaction.reply("Documentação do Java: https://docs.oracle.com/javase/7/docs/api/")
        }else if (selected == "Node.js"){
            await interaction.reply("Documentação do Node.js: https://nodejs.org/en/docs/")
        } else if (selected == "discordjs"){
            await interaction.reply("Documentação do Discord.js: https://discordjs.guide/#before-you-begin")
        }
	}

	if (!interaction.isChatInputCommand()) return
	const command = interaction.client.commands.get(interaction.commandName)
	if(!command) {
		console.error("Comando não encontrado.")
		return
	}

	try{
		await command.execute(interaction)
	}
	catch (error){
		console.error(error)
		await interaction.reply("Perdão mas, não consegui executar esse comando..")
	}
})