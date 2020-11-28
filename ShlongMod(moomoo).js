// ==UserScript==
// @name         ShlongMod (moomoo.io mod)
// @version      1
// @description  Features: [F] BoostPad Macro, [T] Ghost Theme, [G] Auto Windmill
// @author       shelling#2873
// @match        *://*.moomoo.io/*
// @require      https://greasyfork.org/scripts/368273-msgpack/code/msgpack.js?version=598723
// @grant        none
// ==/UserScript==
(() => {
    // 1
    let _arc,
        theme = false,
        boost = false,
        windmill = false;
    const canvas = document.getElementById("gameCanvas"),
          ctx = canvas.getContext("2d");

    // 2
    let ws;
    let websocket = WebSocket.prototype.send
    WebSocket.prototype.send = function (data) {
        ws = this;
        console.log(new Uint8Array(data))
        websocket.call(this, data)
    }

    // 3
    function MouseMove(x, y) {
        canvas.dispatchEvent(new MouseEvent("mousemove", {
            clientX: x, clientY: y
        }));
    }
    let boostmacrofunc = () => {
        if (boost) {
            ws.send(msgpack.encode(["5", [16, null]]));
            ws.send(msgpack.encode(["c", [1, null]]));
            ws.send(msgpack.encode(["c", [0, null]]));
        }
    }
    setInterval(boostmacrofunc, 1);
    let windmillmacrofunc = () => {
        if (windmill) {
            ws.send(msgpack.encode(["5", [10, null]]));
            ws.send(msgpack.encode(["c", [1, null]]));
            ws.send(msgpack.encode(["c", [0, null]]));
        }
    }
    setInterval(windmillmacrofunc, 1);

    // jizz
    document.getElementById("adCard").remove();
    document.getElementById("gameName").innerHTML = "ShlongMod";
    $(".uiElement").css({
        "border-radius": "100px"
    });
    $(".resourceDisplay").css({
        "border-radius": "100px"
    });
    $("#chatBox").css({
        "border-radius": "100px"
    });
    _arc = CanvasRenderingContext2D.prototype.arc
    CanvasRenderingContext2D.prototype.arc = function () {
        if (theme) {
            this.globalAlpha = 0.7
            this.arcStyle = "white"
            this.strokeStyle = "white"
            this.shadowColor = "white";
            this.shadowBlur = 10;
        }
        _arc.apply(this, arguments);
    };
    // 5
    document.addEventListener('keydown', (keycode) => {
        if (keycode.keyCode === 70) {
            boost = !boost
            ws.send(msgpack.encode(["ch", [`Auto-Boost: ${boost}`]]));
        }
        if (keycode.keyCode === 84) {
            theme = !theme
            ws.send(msgpack.encode(["ch", [`Ghost-Theme: ${theme}`]]));
        }
        if (keycode.keyCode === 71) {
            windmill = !windmill
            ws.send(msgpack.encode(["ch", [`Auto-Windmill: ${windmill}`]]));
        }
        if (keycode.keyCode === 71) {
        }
    });
})();
