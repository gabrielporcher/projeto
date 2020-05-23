const app = require('express')()
const consign = require('consign')
const db = require('./config/db')

app.db = db

consign() //Carrega as dependencias e injeta no app
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js') // Precisa estar acima da api, pois precisa ser carregada antes de ser usado algum metodo
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.listen(3000, () => {
    console.log('Backend executando')
})