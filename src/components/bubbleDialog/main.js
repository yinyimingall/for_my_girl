import 'babel-polyfill';
import Vue from 'vue';
import Main from './main.vue';

let DialogConstructor = Vue.extend(Main);
let instance;
const Dialog = function(options={}){
    instance = new DialogConstructor({
        data: options
    })
    instance.vm = instance.$mount();
    document.querySelector(options.el).appendChild(instance.vm.$el);
    return instance.vm;
}

export default Dialog;