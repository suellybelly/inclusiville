"use strict";

import { QuickKeyManager } from './modules/quick-key-manager.js';

// Keys/values for quick keys and the CSS selectors they match.
let keyData = {
    // Press h/H to move forward/backward through headings.
    'h': 'h1, h2, h3, h4, h5, h6',
    // Press k/K to move forward/backward through links.
    'k': 'a, [role="link"]',
    // Press r/R to move forward/backward through page regions and landmarks.
    'r': ' header, nav, main, footer, [role="region"], [role="banner"], [role="navigation"], [role="main"], [role="contentinfo"], [role="search"]', 
    // Press f/F to move forward/backward through form controls.
    'f': 'input, select, button, [role="form"], [role="textbox"], [role="checkbox"], [role="button"]',
    // Press b/B to move forward/backward through buttons.
    'b': 'button, input[type="button"], input[type="submit"], input[type="reset"], [role="button"]',
    // Press l/L to move forward/backward through lists.
    'l': 'ul, ol, dl, [role="list"]'
};

let qkm = new QuickKeyManager(keyData, document.body);

// Check if the pressed key is a quick key.
document.addEventListener( 'keydown', function (e) {
    // If the pressed key is the lowercase version of a quick key,
    // target the next matching node.
    var node = null;
    if (qkm.quickKeys.has(e.key)) {
        node = qkm.quickKeys.get(e.key).nextNode();
    }
    // If the pressed key is the uppercase version of a quick key,
    // target the next matching node.
    else if (e.key === e.key.toUpperCase() && qkm.quickKeys.has(e.key.toLowerCase())) {
        node = qkm.quickKeys.get(e.key.toLowerCase()).previousNode();
    }
    // Move keyboard focus to the matching node (if any).
    if (node) {
        // alert( e.key + " ==> " + node.nodeName + ": " + node.textContent );
        node.focus();
    }
});