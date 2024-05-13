import express from 'express'
const router = express.Router()
import Pedido from "../models/Pedido.js"

// ROTA PEDIDOS
router.get("/pedidos", (req, res) => {
    Pedido.findAll().then(pedidos => {
        res.render("pedidos", {
            pedidos : pedidos
        })
    })
})

//rota de cadastro do pedido
router.post("/pedidos/new", (req, res) => {
    const numero = req.body.numero
    const valor = req.body.valor

    Pedido.create({
        numero : numero,
        valor : valor
    }).then(() => {
        res.redirect("/pedidos")
    }).catch(erro => {
        console.log(erro)
    })
})

//rota exclusão do pedido
router.get("/pedidos/delete/:id", (req, res) => {
    const id = req.params.id
    Pedido.destroy({
        where: {
            id : id
        }
    }).then(() => {
        res.redirect("/pedidos")
    }).catch(erro => {
        console.log(erro)
    })
})

//rota edição do pedido
router.get("/pedidos/edit/:id", (req, res) =>{
    const id = req.params.id
    Pedido.findByPk(id).then(function(pedido) {
        res.render("pedidoEdit", {
            pedido : pedido
        })
    })
})

//rota de alteração do pedido
router.post("/pedidos/update/:id", (req, res) => {
    const id = req.body.id
    const numero = req.body.numero
    const valor = req.body.valor
    Pedido.update(
        {
            numero : numero,
            valor : valor
        },
        {where: {id : id}}
    ).then(() => {
        res.redirect("/pedidos")
    })
})

export default router