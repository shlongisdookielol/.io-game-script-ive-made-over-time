// ==UserScript==
// @name         Warinspace Bots
// @version      2
// @author       shlong#2873
// @match        http://warin.space/
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addValueChangeListener
// ==/UserScript==

(() => {
    "use strict";
    let server;
    let toggle = false;
    const websockets = WebSocket.prototype.send;

    WebSocket.prototype.send = function(data) {
        console.log(new Uint8Array(data))
        server = this.url;
        GM_setValue("WsPackets", Array.from(new Uint8Array(data)));
        return websockets.call(this, data);
    }

    setInterval(() => {
        if (toggle) {
            let websocket = new WebSocket(server);
            websocket.onopen = () => {
                websocket.send(new Uint8Array([5]));
                websocket.send(new Uint8Array([4, 2, 0]));
                GM_addValueChangeListener("WsPackets", (prostate /*literally useless and doesnt do anything but okay*/) => {
                    websocket.send(new Uint8Array(GM_getValue("WsPackets")));
                });
            }
        }
    }, 1000);

    document.addEventListener("keydown", (e) => {
        if (e.keyCode == 84) {
            toggle = !toggle
        }
    });
})();
