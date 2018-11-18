import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import welcome from './views/welcome/index.vue'
import chat from './views/chat/chat.vue'
import gift from './views/gift/index.vue'
const routes = [
    {
        path: '/',
        name: 'welcome',
        component: welcome
    },
    {
        path: '/chat',
        name: 'chat',
        component: chat
    },
    {
        path: '/gift',
        name: 'gift',
        component: gift
    }
]
export default new Router({
    routes
})