/* Middlewares p/ o express:
 Body-parser: Interpreta o body do html //Interpreta JSON p/ JS
 Cors: Integra front-end e back-end corretamente sem erros */
 
 const bodyParser = require('body-parser')
 const cors = require('cors')

 module.exports = app => { // Padrão do Consign, exporta todos os elementos p/ o app (express)
     app.use(bodyParser.json())
     app.use(cors())
 }