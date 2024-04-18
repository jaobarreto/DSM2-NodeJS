import express from "express"

const router = express.Router() //o metodo router é responsavel gerenciar as rotas

import Cliente from "../models/Cliente.js"

// rota clientes
router.get("/clientes", (req, res) => {
    Cliente.findAll().then(clientes => {
        res.render("clientes", {
            clientes : clientes
        })
    })
})

// exportando o modulo de rotas
export default router