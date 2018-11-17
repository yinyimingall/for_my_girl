import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import chat from './views/chat.vue'
const routes = [
    {
        path: '/',
        name: 'chat',
        component: chat
    }
]
export default new Router({
    routes
})