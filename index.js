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
const fs = require('fs')


// verificar se o arquivo existe; caso não, cria vazio
if (!fs.existsSync('./dbPetShop.json')) {
    fs.writeFileSync('dbPetShop.json', "[]")
}
let dbPetShop = require('./dbPetShop.json')

// construtor para os Pets
function Pet(id, nome, raca, nomeDoDono) {
    // this.id = new Date().getTime(), // id gerado automaticamente com base no momento atual; sempre diferente
    this.id = id,
        this.nome = nome,
        this.raca = raca,
        this.nomeDoDono = nomeDoDono
}

// funcao com callback para chamar novamente o menu de perguntas
function resetaSistema(callback) {
    inquirer.prompt(inquirerPerguntas.pause).then(() => {
        console.log("")
        callback()
    })
}


// funcao principal com perguntas do Inquirer
const sistemaPetShop = () => {
    inquirer
        .prompt(inquirerPerguntas.listaPrincipal)
        .then(resposta => {
            if (resposta.opcao === 0) { // Cadastrar Pet
                inquirer.prompt(inquirerPerguntas.cadastrarPet)
                    .then((resposta) => {
                        const { nome, raca, nomeDoDono } = resposta;
                        let id = 1
                        if (dbPetShop.length > 0) { id = dbPetShop[dbPetShop.length - 1].id + 1 }
                        const pet = new Pet(id, nome.trim(), raca.trim(), nomeDoDono.trim())
                        // console.log(pet)
                        console.log(`Registro para o pet ${nome.trim()} criado com sucesso`)
                        dbPetShop.push(pet)
                        fs.writeFileSync('dbPetShop.json', JSON.stringify(dbPetShop))

                        resetaSistema(sistemaPetShop);
                    })
            }

            if (resposta.opcao === 1) { // Listar Pets
                if (dbPetShop.length < 1) {
                    console.log("Nenhum pet cadastrado")
                } else {
                    dbPetShop.forEach(((elemento, indexElemento) => {
                        console.log(`${indexElemento + 1} ==> ID: ${elemento.id} | Pet: ${elemento.nome} | Raca: ${elemento.raca} | Nome do Dono: ${elemento.nomeDoDono}`)
                    }))
                }
                
                resetaSistema(sistemaPetShop);
            }

            if (resposta.opcao === 2) { // Buscar Pet por Nome
                if (dbPetShop < 1) {
                    console.log("Nenhum pet cadastrado")
                    resetaSistema(sistemaPetShop)
                } else {
                    inquirer
                        .prompt(inquirerPerguntas.buscaPorNome)
                        .then(resposta => {
                            let petEncontrado = []
                            dbPetShop.forEach(elementoDbPetShop => {
                                if (resposta.nomeInformado.toLowerCase() == elementoDbPetShop.nome.toLowerCase()) {
                                    petEncontrado.push(elementoDbPetShop)
                                }
                            });
                            if (petEncontrado < 1) {
                                console.log("Nenhum pet encontrado com o nome informado")
                                // resetaSistema(sistemaPetShop);
                            } else {
                                console.log(`- - Encontrado(s) ${petEncontrado.length} pet(s) com o nome informado - -`)
                                petEncontrado.forEach((elementoPetEncontrado, indexElemento) => {
                                    for (propriedade in elementoPetEncontrado) {
                                        console.log(`${propriedade}: ${elementoPetEncontrado[propriedade]}`)
                                    }
                                    console.log('- - - - - - - - - - - - - - - ')
                                });
                                
                            }
                            resetaSistema(sistemaPetShop);
                        })
                }
            }

            if (resposta.opcao === 3) { // Deletar Pet Cadastrado
                if (dbPetShop < 1) {
                    console.log("Nenhum pet cadastrado")
                    resetaSistema(sistemaPetShop);
                } else {
                    inquirer
                        .prompt(inquirerPerguntas.deletarPet)
                        .then(resposta => {
                            if (Number.isNaN(resposta.idInformado)) {
                                console.log("ID inválido")
                            } else {
                                let localizado = false
                                dbPetShop.forEach((elemento, indexElemento) => {
                                    if (elemento.id === resposta.idInformado) {
                                        dbPetShop.splice(indexElemento, 1)
                                        console.log(`Pet ${elemento.nome} com ID ${resposta.idInformado} foi excluido`)
                                        fs.writeFileSync('dbPetShop.json', JSON.stringify(dbPetShop))
                                        localizado = true
                                    }
                                });
                                if (!localizado) { console.log(`Nenhum registro com ID ${resposta.idInformado} foi localizado`) }
                            }

                            resetaSistema(sistemaPetShop);
                        })
                }

            }

            if (resposta.opcao === 4) { // Finaliza programa
                // apenas finaliza ...
                console.log("Tenha um Bom Dia :) ")
            }
        })
}


// Execução inicial da perguntas
sistemaPetShop();