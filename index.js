// DESAFIO EXTRA 01 =
// 1 - Criar um método construtor para criar novos pets (animais). Esse objeto deve conter os
// atributos: Identificador, Nome do PET, raça, nome do dono. (500 pontos)
// 2 - Solicitar ao usuário o que ele quer fazer (utilizando o inquirer). As opções são listadas
// abaixo (500 pontos):
// ● Cadastrar novo pet
// ● Listar todos os pets cadastrados
// ● Buscar pet por nome
// 3 - Os pets cadastrados devem ser salvos em um arquivo em formato JSON (1000 pontos).
// 4 - Não podem existir dois pets com o mesmo identificador (1000 pontos).
// 5 - Quando buscar o pet por nome, todos os dados do pet devem ser printados no terminal
// (Não pode usar pet.nome, pet.raca, pet.dono, pet.identificador, existem outras maneiras de
// pegar os dados de um pet). (1000 pontos).

const inquirer = require('inquirer')
const inquirerPerguntas = require('./inquirerPerguntas')

function Pet(nome, raca, nomeDoDono) {
    this.id = new Date().getTime(),
        this.nome = nome,
        this.raca = raca,
        this.nomeDoDono = nomeDoDono
}

inquirer.prompt(inquirerPerguntas.listaPrincipal).then(petShop)

function petShop(resposta) {
    if (resposta.opcao === 0) { // Cadastrar Pet
        
        inquirer.prompt(inquirerPerguntas.cadastrarPet)
            .then((resposta) => {
                const { nome, raca, nomeDoDono } = resposta;
                let pet = new Pet(nome, raca, nomeDoDono)
                console.log(pet)
            })

    }

    if (resposta.opcao === 1) { // Listar Pets

    }

    if (resposta.opcao === 2) { // Buscar Pet por Nome

    }
}