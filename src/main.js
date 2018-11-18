import Vue from 'vue'
import App from './App'
import router from './router'

Vue.prototype.$eventBus = new Vue()
window.onload = function () {
    new Vue({
        router,
        el: '#app',
        render: h => h(App)
    })
}
