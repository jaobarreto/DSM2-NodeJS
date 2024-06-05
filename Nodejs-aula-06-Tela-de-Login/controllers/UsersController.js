import express from 'express'
const router = express.Router()
import User from "../models/User.js"
import bcrypt from "bcrypt" //biblioteca hash de senha
import { where } from 'sequelize'

// ROTA LOGIN
router.get("/login", (req, res) => {
    res.render('login'), {
        loggedOut: true,
        messages: req.flash()
    }
})

//ROTA CADASTRO
router.get("/cadastro", (req, res) => {
    res.render('cadastro'), {
        loggedOut: true,
        messages: req.flash()
    }
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
        } else {
           req.flash('danger', 'Usuário já possui cadastro, faça o login.')
           res.redirect("/cadastro")
        }
    })
})

// Rota de Autenticação do Usuario
router.post("/authenticate", (req, res) => {
    const email = req.body.email
    const password = req.body.password
    // Busca o Usuario no Banco
    User.findOne({ where: { email: email } }).then(user => {
        // Se o Usuario Exisitir
        if (user != undefined) {
            //Valida a senha
            const correct = bcrypt.compareSync(password, user.password)
            //Se a Senha for Valida
            if (correct) {
                //Autoriza o login - posteriormente aq sera criado a sessão
                req.session.user = {
                    id: user.id,
                    email: user.email
                }

                //Criando uma flash message
                req.flash('success', 'Login efetuado com sucesso!')

                res.redirect("/")
                //res.send(`Usuário logado: <br> ID: ${req.session.user['id']} <br> email: ${req.session.user['email']}`)
                //Se a senha não for valida
            } else {
                req.flash('danger', 'Senha incorreta! Tente novamente.')
                res.redirect("/login")
            }
        } else {
            req.flash('danger', 'Usuário não cadastrado!')
            res.redirect("/login")
        }
    })
})

//rota logout
router.get("/logout", (req, res) =>{
    req.session.user = undefined
    res.redirect("/")
})

export default router
