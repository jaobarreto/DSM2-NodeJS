import express from 'express'
const app = express()
import multer from 'multer'
import connection from './config/sequelize-config.js'

app.use(express.static('public'))
app.set('view engine', 'ejs')

connection.authenticate().then(() => {
    console.log("Conexão com o banco feita com sucesso!")
}).catch((error) => {
    console.log(error)
})

connection.query('CREATE DATABASE IF NOT EXISTS galeria;').then(() => {
    console.log("O banco de dados está criado.")
}).catch((error) => {
    console.log(error)
})

//configurando o Multer
const upload = multer({dest: "public/uploads"})

//rota principal
app.get("/", (req, res) =>{
    res.render('index')
})

//rota upload
app.post("/upload", upload.single("file"), (req, res) =>{
    res.send("Arquivo recebido!")
})

const port = 8080
app.listen(port, (error) =>{
    if(error){
        console.log(`Ocorreu um erro! ${error}`)
    }else{
        console.log(`Servidor rodadndo em http://localhost:${port}.`)
    }
})