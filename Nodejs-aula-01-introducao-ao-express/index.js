//Importando Express (CommonJS Modules)
const express = require("express")

//Iniciando o Express na Variável APP
const app = express()

//Criando a primeira rota (Rota Principal)
app.get("/", (req, res) => {
    res.send("<h1>Bem-vindo ao meu site! (●'◡'●)</h1>")
})

//Criando a rota Perfil
app.get("/perfil/:nome?", (req, res) =>{     //criando um parametro do perfil (:nome é um parametro obrigatorio)

    const nome = req.params.nome    //coletando o parametro da rota e gravando na variavel nome

    if (nome){
        res.send(`<h2>Olá, ${nome} <br> Seja bem-vindo.</h2>`)
    }
    else{
        res.send(`<h2>Faça o login para acessar o seu perfil. </h2>`)
    }
})

//Criando a rota Vídeos (com varios parametros obrigatorios)
app.get("/videos/:playlist/:video", (req, res) =>{

    let playlist = req.params.playlist

    let video = req.params.video


    res.send(`<h2 style='text-align:center;'>Você está na playlist de ${playlist}.</h2> <br>
    Reproduzindo o vídeo <strong>${video}...</strong>`)
})

//Criando a rota Produtos
app.get("/produtos/:produto?", (req, res) =>{

    let produto = req.params.produto

    if(produto){
        res.send(`<h2>O produto que você deseja comprar é ${produto}.`)
    }
    else{
        res.send(`<h2>Carrinho vazio. Retorne a página de produtos</h2>`)
    }
})

//Iniciando o servidor 
app.listen(8080, function(erro) {
    if(erro) {
        console.log("Ocorreu um erro!")
    } else {
        console.log("Servidor iniciado com sucesso!")
    }
})
