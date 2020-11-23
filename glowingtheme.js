// ==UserScript==
// @name         diep.io glowing theme
// @version      1
// @description  ooga booga
// @author       shlong#2873
// @match        *://diep.io/
// ==/UserScript==

let Canvas;
Canvas = CanvasRenderingContext2D.prototype.fill;
CanvasRenderingContext2D.prototype.fill = function () {
    this.shadowColor = this.fillStyle;
    this.shadowBlur = 18;
    Canvas.apply(this, arguments);
};
