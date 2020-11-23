// ==UserScript==
// @name         connect to a server from tampermonkey
// @description  ok
// @version      0.1
// @author       shlong#2873
// @match        *:///
// ==/UserScript==


let local = new WebSocket('ws://localhost:3000');
let on = false;
window.wshook = window.WebSocket.prototype.send;
window.WebSocket.prototype.send = function(data) {
    if (on === false) {
        on = true;
        local.send(data);
    }
    window.wshook.call(this, data);
};
