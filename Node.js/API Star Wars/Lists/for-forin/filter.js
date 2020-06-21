const { obterPessoas } = require("./service");

/* Destructuring objects no JavaScript
const item = {
    nome: "Erick",
    idade: 12,

}
const { nome } = item
console.log(nome)
*/

Array.prototype.meuFilter = function (callback) {
    const lista = []
    for (index in this) {
        const item = this[index]
        const result = callback(item, index, this)
        // 0, "", null, undefined === false
        if (!result) continue;
        lista.push(item)
    }
    return lista;
}

async function main() {
    try {
        const {
            results
        } = await obterPessoas(`a`)

        //const familiaSkywalker = results.filter(function (item) {
            //Padrão precisa retornar um booleano
            //para informar se deve manter ou remover da lista
            //false > remove da lista
            //true > mantém
            //não encontrou = -1
            //encontrou = posicaoNoArray
            //const result = item.name.toLowerCase().indexOf(`skywalker`) !== -1
            //return result
            //})
            const familiaSkywalker = results.meuFilter((item, index, lista) => {
                console.log(`index: ${index}`, lista.length)
                return item.name.toLowerCase().indexOf("skywalker") !== -1
            })

            const names = familiaSkywalker.map((pessoa) => pessoa.name)
            console.log(names)

    } catch (error) {
        console.error("Deu ruim", error)
    }

}

main()