// ==UserScript==
// @name         (shlong scripting) Arras.io fov script
// @author       shlong#2873
// @match        *://arras.io/
// ==/UserScript==

(function() {
    let FOV = false;
    function fovFunc() {
        if (FOV) {
            Arras(1337).player.view = 5000;
        }
    }
    setInterval(fovFunc);
    // SWITCHES
    document.addEventListener("keydown", function (e) {
        if (e.keyCode === 70) {
            FOV = !FOV
        }
    });
})();
