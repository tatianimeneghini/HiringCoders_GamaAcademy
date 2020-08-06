const Commander = require('commander');
const Database = require('./database');
const Heroi = require('./heroi');
const commander = require('commander');
const { Command } = require('commander');

async function main() {
    Commander 
        .version("v1")
        .option('-n, --nome [value]', "Nome do Heroi")
        .option('-p, --poder [value]', "Poder do Heroi")
        .option('-i, --id [value]', "Id do Heroi")
        .option('-c, --cadastrar', "Cadastrar um Heroi")
        .option('-l, --listar', "Listar um Heroi")
        .option('-a, --atualizar [value]', "Atualizar um Heroi pelo id")
        .option('-r, --remover [value]', "Remover um Heroi pelo id")
        .parse(process.argv)

    //Para pegar somente a classe com nome, poder e id.
    const heroi = new Heroi (Commander);

    try {
        if (Commander.cadastrar) {
            //Deleta o id que chega com undefined
            delete heroi.id;

            const resultado = await Database.cadastrar(heroi);
            if (!resultado) {
                console.error("Heroi não foi cadastrado!");
                return;
            }
            console.log("Heroi cadastrado com sucesso!");
        }
        if (commander.listar) {
            const resultado = await Database.listar();
            console.log(resultado);
            return;
        }
        if (Commander.remover) {
            const resultado = await Database.remover(heroi.id)
            if (!resultado) {
                console.error("Não foi possível remover o Heroi");
                return;
            }
            console.log("Heroi removido com sucesso!");
        }

        if (Commander.atualizar) {
            const idParaAtualizar = parseInt(Commander.atualizar);
            //Remover todas chaves que estiveres com undefined || null
            const dado = JSON.stringify(heroi);
            const heroiAtualizar = JSON.parse(dado);
            const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar);

            if (!resultado) {
                console.error("Não foi possível atualizar o heroi");
                return;
            }
            console.log("Heroi atualizado com sucesso!");
        }
    } catch (error) {
        console.error("Deu ruim", error);
    }

}

main();