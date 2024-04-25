import express from "express"

const router = express.Router() //o metodo router é responsavel gerenciar as rotas

import Cliente from "../models/Cliente.js"
import { where } from "sequelize"

// rota clientes
router.get("/clientes", (req, res) => {
    Cliente.findAll().then(clientes => {
        res.render("clientes", {
            clientes : clientes
        })
    })
})

// rota de cadastro de clientes
router.post("/clientes/new", (req, res) =>{   //o post coleta informações do formulario
    const nome = req.body.nome      //coleta o dado do formulario e joga na variavel (nome)
    const cpf = req.body.cpf
    const endereco = req.body.endereco

    Cliente.create({        //chamando o model
        nome : nome,
        cpf : cpf,
        endereco : endereco
    }).then(() => {             //promessa
        res.redirect("/clientes")   // se sucesso ele redireciona novamente para /clientes
    }).catch(erro => {
        console.log(erro)       //se não ele retorna "erro"
    })
})

//rota de exclusao de clientes
router.get("/clientes/delete/:id", (req, res) => { //o get ele coleta a informação da url
    const id = req.params.id

    Cliente.destroy({
        where: {
            id : id
        }
    }).then(() => {
        res.redirect("/clientes")
    }).catch(erro => {
        console.log(erro)
    })
})

//rota de edição de clientes
router.get("/clientes/edit/:id", (req, res) =>{
    const id = req.params.id

    Cliente.findByPk(id).then(cliente => {
        res.render("clienteEdit", {
            cliente : cliente
        })
    })
})

//rota update
router.post("/clientes/update/:id", (req,res) => {
    const id = req.body.id
    const nome = req.body.nome
    const cpf = req.body.cpf
    const endereco = req.body.endereco
    
    Cliente.update({
        nome: nome,
        cpf: cpf,
        endereco: endereco
    },
    {
        where: {id : id}
    }
).then(() => {
    res.redirect("/clientes")
})
})

// exportando o modulo de rotas
export default router