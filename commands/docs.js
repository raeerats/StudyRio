const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");

const row = new ActionRowBuilder()
    .addComponents(
        new StringSelectMenuBuilder()
            .setCustomId("select")
            .setPlaceholder("nenhuma linguagem")
            .addOptions({
                label: "JavaScript",
                description: 'Documentação do JS',
                value: "javascript"
            },
            {
                label: "Python",
                description: 'Documentação do Python',
                value: "python"
            },
            {
                label: "Java",
                description: 'Documentação do Java',
                value: "java"
            },
            {
                label: "Node.js",
                description: 'Documentação do Node.js',
                value: "nodejs"
            },
            {
                label: "Discord.js",
                description: 'Documentação do Discord.js',
                value: "discordjs"
            }
            )
    );

module.exports = {
    data: new SlashCommandBuilder()
        .setName("docs")
        .setDescription('Acessar a documentação das tecnologias desejadas'),
    async execute(interaction) {
        await interaction.reply({content: "Selecione uma das tecnologias abaixo: ", components: [row]})
    }
}
