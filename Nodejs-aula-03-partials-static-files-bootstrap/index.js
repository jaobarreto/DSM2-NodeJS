//Importando Express (CommonJS Modules)
const express = require("express")

//Iniciando o Express na Variável APP
const app = express()

//Definindo o EJS para renderizar páginas HTML
app.set('view engine', 'ejs')

//Definindo a pasta "public" para uso de arquivos estaticos
app.use(express.static('public'))

//Criando a primeira rota (Rota Principal)
app.get("/", (req, res) => {
    res.render('index')
})

//Criando a rota Perfil
app.get("/perfil/:nome?", (req, res) => {     //criando um parametro do perfil (:nome é um parametro obrigatorio)

    res.render('perfil')
})
//Criando a rota Vídeos (com varios parametros obrigatorios)
app.get("/videos", (req, res) => {

    res.render('videos')
})

//Criando a rota Produtos
app.get("/produtos/:produto?", (req, res) => {

    let produto = req.params.produto
    //array com os produtos
    let produtos = ['Computador', 'Celular', 'Tablet', 'Notebook']
    res.render('produtos', {
        //Enviando as variáveis para a página
        produto: produto,
        produtos: produtos
    })
})

//Criando a rota Pedidos
app.get("/pedidos", (req, res) => {
    //Array de objetos com os pedidos
    let pedidos = [
        { produto: "Celular", preco: 3000 },
        { produto: "Computador", preco: 7000 },
        { produto: "Tablet", preco: 2100 },
        { produto: "Notebook", preco: 3900 }]
    res.render('pedidos', {
        //Enviando o array de objetos para página
        pedidos: pedidos
    })
})

//Criando a rota Clientes
app.get("/clientes", (req, res) => {
    //array dos clientes
    let clientes = [
        { nome: "Maria Silva", cpf: "987.654.321-00", cidade: "Florianópolis-SC" },
        { nome: "Carlos Oliveira", cpf: "456.789.123-00", cidade: "Salvador-BA" },
        { nome: "Ana Souza", cpf: "654.321.987-00", cidade: "São Paulo-SP" },
        { nome: "Pedro Santos", cpf: "789.123.456-00", cidade: "Rio de Janeiro-RJ" },
        { nome: "Juliana Lima", cpf: "321.987.654-00", cidade: "Porto Alegre-RS" }
    ]
    //enviando os arrays para página
    res.render('clientes', {
        clientes: clientes
    })
})

//Iniciando o servidor 
app.listen(8080, function (erro) {
    if (erro) {
        console.log("Ocorreu um erro!")
    } else {
        console.log("Servidor iniciado com sucesso!")
    }
})
