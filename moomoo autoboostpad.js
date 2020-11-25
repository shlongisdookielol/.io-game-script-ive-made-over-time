// ==UserScript==
// @name         (shlong scripting) Auto Boost-Pad
// @version      1
// @description  f to toggle on and off
// @author       shlong#2873
// @match        *://moomoo.io/*
// @match        *://dev.moomoo.io/*
// @match        *://sandbox.moomoo.io/*
// @grant        none
// ==/UserScript==

let websocket = WebSocket.prototype.send
let boostpad = new Uint8Array([146, 161, 53, 146, 16, 192]),
    mdown = [146, 161, 99, 146, 1, 192],
    mup = [146, 161, 99, 146, 0, 192];
let ws,
    boost = false;

WebSocket.prototype.send = function (data) {
    ws = this;
    websocket.call(this, data)
}
let fastboost = () => {
    if (boost) {
        ws.send(new Uint8Array(boostpad));
        ws.send(new Uint8Array(mdown));
        ws.send(new Uint8Array(mup));
    }
}
setInterval(fastboost, 1);

document.addEventListener('keydown', (keycode) => {
    if (keycode.keyCode === 70) {
        boost = !boost
        console.log("Auto Boost-Pad: " + boost)
    }
});
