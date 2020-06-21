/*
0. Obter um usuário.
1. Obter o número de telefone de um usuário a partir de seu ID
2. Obter o endereço do usuário pelo ID.
*/

//Importamos um módulo interno do node.js
const util = require("util")
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
    //Quando der problema -> REJECT(erro)
    //Quando sucess -> RESOLVE
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(function() {
            //return reject(new Error("Deu ruim de verdade!"))
            return resolve({
                id: 1,
                nome: "Aladin",
                dataNascimento: new Date()
            })
        }, 1000)
    })
}

function obterTelefone(idUsuario) {
    return new Promise(function resolverPromise(resolve, reject){
        setTimeout(() => {
            return resolve({
                numero: "11199902",
                ddd: 11
            })
        }, 2000);
    })
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: "Rua dos bobos",
            numero: 0
        })
    }, 2000);
}

//Adicionar a palavra async -> automaticamente retornará uma Promise
main() //Necessário chamar a função Async
async function main(){
    try {
        console.time("medida-promise")
        const usuario = await obterUsuario()
        //const telefone = await obterTelefone(usuario.id)
        //onst endereco = await obterEnderecoAsync(usuario.id)
        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])
        const endereco = resultado[1]
        const telefone = resultado[0]

        console.log(`
            Nome: ${usuario.nome},
            Telefone: (${telefone.ddd}) ${telefone.numero},
            Endereco: ${endereco.rua}, ${endereco.numero}
        `)
        console.timeEnd("medida-promise")
    }
    catch(error){
        console.error("Deu ruim", error)
    }
}

/* //Promise
const usuarioPromise = obterUsuario()
//Para manipular o sucesso, usamos a função .then
//Para manipular erros, usamos o .catch
usuarioPromise
    .then(function (usuario) {
        //Usuário -> telefone -> telefone
        return obterTelefone(usuario.id) 
        .then(function resolverTelefone(result) {
            return {
                usuario: {
                    nome: usuario.nome,
                    id: usuario.id
                },
                telefone: result
            }
        })
    })
    .then(function (resultado) {
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco.then(function resolverEndereco(result) {
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        })
    })
    .then(function (resultado) {
        console.error(`
            Nome: ${resultado.usuario.nome}
            Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
            Telefone: ${resultado.telefone.ddd} ${resultado.telefone.numero}
        `)
    })
    .catch(function (error) {
        console.error("Deu ruim", error)
    })

*/

/*
obterUsuario(function resolverUsuario(erro, usuario){
    // null || "" || 0===false
    if(erro){
        console.error("Deu ruim em usuário", erro)
        return;
    }
    obterTelefone(usuario.id, function resolverTelefone(erro1, telefone) {
        if(erro1){
            console.error("Deu ruim em telefone", error)
            return;
        }
        obterEndereco(usuario.id, function resolverEndereco(erro2, endereco) {
            if(erro2){
                console.error("Deu ruim em Endereço", error)
                return;
            }

            console.log(`
            Nome: ${usuario.nome},
            Endereco: ${endereco.rua}, ${endereco.numero},
            Telefone: ${telefone.ddd} + " " + ${telefone.numero}
            `)
        })
    })
});
*/