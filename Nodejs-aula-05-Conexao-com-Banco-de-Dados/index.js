// Importando o Express com ES6 Modules
import express from 'express'
// Iniciando o Express na variável app
const app = express()

//Importando o arquivo de conexão do banco
import connection from './config/sequelize-config.js'

// Importando os Controllers (onde estão as rotas) 
import PedidosController from "./controllers/PedidosController.js"
import ClientesController from "./controllers/ClientesController.js"
import ProdutosController from "./controllers/ProdutosController.js"

//Realizando a conexão com o bando de dados
connection.authenticate().then(() => {
    console.log("Conexão com o banco de dados feita com sucesso!")
}).catch((error) => {
    console.log(error)
})

//Criando o banco de dados (se ele não existir)
connection.query('CREATE DATABASE IF NOT EXISTS loja;').then(() => {
    console.log("O banco de dados está criado");
}).catch((error) => {
    console.log("Ocorreu um erro ao criar o banco de dados:", error);
});


// Define o EJS como Renderizador de páginas
app.set('view engine', 'ejs')
// Define o uso da pasta "public" para uso de arquivos estáticos
app.use(express.static('public'))

//Configurando Express para receber dados vindo de formulários
app.use(express.urlencoded({extended: false}))

// Definindo o uso das rotas dos Controllers
app.use("/", PedidosController)
app.use("/", ClientesController)
app.use("/", ProdutosController)

// ROTA PRINCIPAL
app.get("/", function (req, res) {
    res.render("index")
})

// INICIA O SERVIDOR NA PORTA 8080
app.listen(4000, function (erro) {
    if (erro) {
        console.log("Ocorreu um erro!")

    } else {
        console.log("Servidor iniciado com sucesso!")
    }
})