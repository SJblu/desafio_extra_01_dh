const inquirerPerguntas = {
    listaPrincipal: {
        type: 'list',
        name: 'opcao',
        message: ' = = = PET SHOP DH = = = ',
        choices: [
            {
                name: 'Cadastrar novo Pet',
                value: 0
            },
            {
                name: 'Listar todos os pets cadastrados',
                value: 1
            },
            {
                name: 'Buscar pet por nome',
                value: 2
            }
        ]
    },
    cadastrarPet: [
        {
            type: 'input',
            name: 'nome',
            message: "Nome do Pet: "
        },
        {
            type: 'input',
            name: 'raca',
            message: "Raca: "
        },
        {
            type: 'input',
            name: 'nomeDoDono',
            message: "Nome do Dono: "
        }
    ]
}

module.exports = inquirerPerguntas