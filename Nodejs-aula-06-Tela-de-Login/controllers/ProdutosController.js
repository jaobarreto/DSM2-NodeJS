import express from "express"
const router = express.Router()
import Produto from "../models/Produto.js"
import Auth from "../middleware/Auth.js"

// ROTA PRODUTOS
router.get("/produtos", Auth, (req, res) => {
    Produto.findAll().then(produtos => {
        res.render("produtos", {
            produtos : produtos
        })
    })
})

//rota de cadastro do produto
router.post("/produtos/new", (req, res) => {
    const nome = req.body.nome
    const preco = req.body.preco
    const categoria = req.body.categoria

    Produto.create({
        nome : nome,
        preco : preco,
        categoria : categoria
    }).then(() => {
        res.redirect("/produtos")
    }).catch(erro => {
        console.log(erro)
    })
})

//rota exclusão do produto
router.get("/produtos/delete/:id", (req, res) => {
    const id = req.params.id
    Produto.destroy({
        where: {
            id : id
        }
    }).then(() => {
        res.redirect("/produtos")
    }).catch(erro => {
        console.log(erro)
    })
})

//rota edição do produto
router.get("/produtos/edit/:id", (req, res) =>{
    const id = req.params.id
    Produto.findByPk(id).then(function(produto) {
        res.render("produtoEdit", {
            produto : produto
        })
    })
})

//rota de alteração do produto
router.post("/produtos/update/:id", (req, res) => {
    const id = req.body.id
    const nome = req.body.nome
    const preco = req.body.preco
    const categoria = req.body.categoria
    Produto.update(
        {
            nome : nome,
            preco : preco,
            categoria : categoria
        },
        {where: {id : id}}
    ).then(() => {
        res.redirect("/produtos")
    })
})

export default router