import Vue from 'vue'
import Toasted from 'vue-toasted'


Vue.use(Toasted, {
    iconPack: 'material',
    duration: 3000
})

Vue.toasted.register(
    'defaultSuccess', 'Operação realizada com sucesso!', {type: 'success'}
)

Vue.toasted.register(
    'defaultError', payload => !payload.msg ? 'Erro inesperado' : payload.msg, {type: 'error'}
)