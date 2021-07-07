// ==UserScript==
// @name         Diep.io Glow Theme
// @namespace    http://tampermonkey.net/LIGMABALLS
// @version      2
// @description  lol
// @author       enderman8686#2873
// @match        *://diep.io/
// @match        *://diep-private.binaryperson.repl.co/
// @grant        unsafeWindow
// ==/UserScript==

(() => {
    "use strict";

    const proxiedHook = CanvasRenderingContext2D.prototype;
    const _fill = CanvasRenderingContext2D.prototype.fill,
          _rect = CanvasRenderingContext2D.prototype.fillRect,
          _drawImage = CanvasRenderingContext2D.prototype.drawImage;
    const canvas = document.getElementById("canvas"),
          ctx = canvas.getContext("2d");
    const UsernameBar = document.getElementById("textInput")
    const otherInit = setInterval(() => {
        if (document.getElementById("loading").innerText == "") {
            unsafeWindow.input.execute("ren_background_color 0x1a1a1a");
            clearInterval(otherInit);
        }
    });

    // proxied hook stuff
    proxiedHook.fillText = new Proxy(proxiedHook.fillText, {
        apply(_fillText, _thisArg, args) {
            if (args[0] == "You're using an adblocker, please consider disabling it to support the game") {
                args[0] = " Thank you for using my theme, if you need help just contact my discord :).";
                _thisArg.fillStyle = "red";
                _thisArg.shadowColor = "red";
                _thisArg.shadowBlur = 20;
            }
            if (args[0] == "diep") {
                _thisArg.fillStyle = "#89ff69";
            }
            if (args[0] == "Auto Spin: OFF") {
                args[0] = "canvas noti lol"
            }
            _fillText.apply(_thisArg, args);
        }
    });

    proxiedHook.fillRect = new Proxy(proxiedHook.fillRect, { // thanks shadam for this
        apply(_fillRect, _thisArg, args) {
            if([
                // FFA
                "#8efffb",
                "#71ccc8",
                "#a4fffb",
                // SURVIVAL
                "#b4ff8e",
                "#90cc71",
                "#c3ffa4",
                // 2 TEAMS
                "#ff8e8e",
                "#cc7171",
                "#ffa4a4",
                // 4 TEAMS
                "#ffeb8e",
                "#ccbc71",
                "#ffefa4",
                // DOMINATION
                "#8eb2ff",
                "#718ecc",
                "#a4c1ff",
                // TAG
                "#b58eff",
                "#9071cc",
                "#c3a4ff",
                // MAZE
                "#fb8eff",
                "#c871cc",
                "#fba4ff",
                // SANDBOX
                "#fdcdac",
                "#caa489",
                "#fdd7bc"
            ].includes(_thisArg.fillStyle)) return;
            _thisArg.shadowColor = "white";
            _thisArg.shadowBlur = 20;
            _fillRect.apply(_thisArg, args);
        }
    });

    proxiedHook.strokeText = new Proxy(proxiedHook.strokeText, {
        apply(_strokeText, _thisArg, args) {
            _thisArg.strokeStyle = "#383838";
            _strokeText.apply(_thisArg, args);
        }
    });

    proxiedHook.fillRect = new Proxy(proxiedHook.fillRect, {
        apply(_rect, _thisArg, args) {
            if (_thisArg.globalAlpha == 0.5) {
                _thisArg.fillStyle = "#000000";
            }
            _rect.apply(_thisArg, args);
        }
    });

    // not proxied
    CanvasRenderingContext2D.prototype.drawImage = function (image) {
        if (image.src == "https://static.diep.io/title.png") {
            image.src = "black"
        }
        _drawImage.apply(this, arguments);
    };
    CanvasRenderingContext2D.prototype.fill = function () {
        // turret
        if (this.fillStyle == "#999999") {
            this.fillStyle = "transparent";
            this.shadowColor = "white";
            this.shadowBlur = 20;
            // teams
        } else if (this.fillStyle == "#00b2e1") { // blue team
            this.shadowColor = "#00b2e1";
            this.shadowBlur = 20;
        } else if (this.fillStyle == "#f14e54") { // red team
            this.shadowColor = "#f14e54";
            this.shadowBlur = 20;
        } else if (this.fillStyle == "#00e16e") { // green team
            this.shadowColor = "#00e16e";
            this.shadowBlur = 20;
        } else if (this.fillStyle == "#bf7ff5") { // purple team
            this.shadowColor = "#bf7ff5";
            this.shadowBlur = 20;

            // shapes
        } else if (this.fillStyle == "#ffe869") { // square
            this.fillStyle = "transparent";
            this.shadowColor = "#ffe869";
            this.shadowBlur = 15;
        } else if (this.fillStyle == "#fc7677") { // triangle
            this.fillStyle = "transparent";
            this.shadowColor = "#fc7677";
            this.shadowBlur = 15;
        } else if (this.fillStyle == "#768dfc") { // pentagon
            this.fillStyle = "transparent";
            this.shadowColor = "#768dfc";
            this.shadowBlur = 15;
        } else if (this.fillStyle == "#f177dd") { // crashers
            this.fillStyle = "transparent";
            this.shadowColor = "#f177dd";
            this.shadowBlur = 15;

        } else if (this.fillStyle == "#000000") { // crashers
            this.fillStyle = "white"
            this.shadowColor = this.fillStyle;
            this.shadowBlur = 15;
        }
        _fill.apply(this, arguments);
    };
})();
