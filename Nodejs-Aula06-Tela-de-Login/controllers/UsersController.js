import express from 'express'
const router = express.Router()
import User from "../models/User.js"
import bcrypt from "bcrypt" //biblioteca hash de senha
import { where } from 'sequelize'

// ROTA LOGIN
router.get("/login", (req, res) => {
    res.render('login')
})

//ROTA CADASTRO
router.get("/cadastro", (req, res) => {
    res.render('cadastro')
})

//ROTA DE CRIAÇÃO DE USUÁRIO NO BANCO
router.post("/createUser", (req, res) => {
    //Coletando informações do corpo da requisição
    const email = req.body.email
    const password = req.body.password

    //verificando se o usuario ja esta cadastrado
    User.findOne({ where: { email: email } }).then(user => {
        //se nao houver
        if (user == undefined) {
            //aqui sera feito o cadastro
            const salt = bcrypt.genSaltSync(10) //quantidade do hash
            const hash = bcrypt.hashSync(password, salt)
            //aqui sera feito o usuario com hash
            User.create({
                email: email,
                password: hash // armazenar o hash, não a senha clara
            }).then(() => {
                res.redirect("/login")
            })
        }   else{
            res.send(`Usuário já cadastrado! <br> <a href="/login">Tentar novamente.</a>`)
        }
    })
})

export default router
