import Dialog from './main.js'

export function say(flag, msg){
    let dialog = new Dialog({
        message: msg,
        direction: flag===0?'left':'right',
        img: flag===0?'me':'her',
        el: '#main-chat'
    })
    // let h = document.documentElement.clientHeight || document.body.clientHeight;
    let h = document.body.clientHeight;
    window.scrollTo(0, h);
    dialog.$el.classList.add('show')
}
export function iSay(msg) {
    say(0, msg)
}

export function sheSay(msg) {
    say(1, msg)
}