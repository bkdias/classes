//Servidor
const express = require('express')
const server = express()

const {
    PageLanding,
    PageStudy,
    PageGiveClasses,
    saveClasses
} = require('./pages')

//Configuração nunjucks (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})

//Inicio e configuração do servidor
server
// receber os dados do req.body
.use(express.urlencoded({ extended: true}))
//aponta a pasta public para buscar os arquivos estáticos da página (img, scripts, css)
.use(express.static("public")) 
//Rotas da aplicação
.get("/", PageLanding)
.get("/study", PageStudy )
.get("/give-classes", PageGiveClasses)
.post("/save-classes", saveClasses) //rota para metódo POST do formulário give-class
//start do servidor
.listen(5500)
