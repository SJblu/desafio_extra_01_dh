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
                name: 'Listar todos os Pets cadastrados',
                value: 1
            },
            {
                name: 'Buscar Pet por nome',
                value: 2
            },
            {
                name: 'Deletar Pet cadastrado',
                value: 3
            }
        ]
    },
    cadastrarPet: [
        {
            type: 'input',
            name: 'nome',
            message: "Nome do Pet:"
        },
        {
            type: 'input',
            name: 'raca',
            message: "Raca:"
        },
        {
            type: 'input',
            name: 'nomeDoDono',
            message: "Nome do Dono:"
        }
    ],
    buscaPorNome: {
        type: 'input',
        name: 'nomeInformado',
        message: 'Informe o nome do Pet:'
    },
    deletarPet: {
        type: 'number',
        name: 'idInformado',
        message: 'ID do Pet que será deletado:'
    }
}

module.exports = inquirerPerguntas