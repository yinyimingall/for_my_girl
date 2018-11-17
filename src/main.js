import Vue from 'vue'
import App from './App'
import router from './router'
import Popover from 'vue-js-popover'

Vue.use(Popover)
window.onload = function () {
    new Vue({
        router,
        el: '#app',
        render: h => h(App)
    })
}
