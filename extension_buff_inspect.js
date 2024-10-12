// ==UserScript==
// @name         Buff Inspect Link
// @namespace    http://tampermonkey.net/
// @version      2024-04-21
// @description  try to take over the world!
// @author       You
// @match        http://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  // Your code here...
  window.onload = function () {
    const arr = [];
    const inspectLinks = document.getElementsByClassName("csgo-action-link");
    for (let i = 0; i < inspectLinks.length; i++) {
      arr.push(inspectLinks[i].href);
    }
    console.log(`'${arr.join("','")}'`);
  };
})();
