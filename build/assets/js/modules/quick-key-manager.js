/**
 * @class
 * Class to manage quick keys in the current application.
 */
"use strict";

import { QuickKey } from "./quick-key.js";

export class QuickKeyManager {

    quickKeys = new Map();

    /**
     * @constructor
     * @param {Object} quickKeyData - Set of key/value pairs mapping keyboard characters to CSS selectors.
     * @param {Node} rootNode - Root node to use for finding quick key matches.
     * @returns {QuickKeyManager} - A new instance of the QuickKeyManager class. 
     */
    constructor(quickKeyData, rootNode) {
        // Create a new QuickKey object for each key/selector pair.
        for (const key in quickKeyData) {
            if (Object.hasOwnProperty.call(quickKeyData, key)) {
                const selector = quickKeyData[key];
                const qk = new QuickKey(key, selector, rootNode);
                if (qk.nodes.length > 0) {
                    this.quickKeys.set(key, new QuickKey(key, selector, rootNode));
                }
            }
        }
    }

    /**
     * Binds the specified function to the node returned
     * by the pressed quick key. The lowercase quick key yields
     * the next matching node, and the uppercase quick key yields
     * the previous matching node.
     * 
     * The specified function must take two parameters:
     * - The node returned by the quick key.
     * - The event processed by the "keydown" listener.
     * @method
     * @param {func} - The function to call on the node returned by pressing the quick key.
     */
    bindQuickKeysToFunction(func) {
        document.addEventListener( 'keydown', function (e) {           
            // If the lowercase quick key is pressed...
            // use the next matching node.
            var node = null;
            if (this.quickKeys.has(e.key)) {
                node = this.quickKeys.get(e.key).nextNode();
            }
            // If the uppercase quick key is pressed, 
            // use the previous matching node.
            else if (e.key === e.key.toUpperCase() && this.quickKeys.has(e.key.toLowerCase)) {
                node = this.quickKeys.get(e.key.toLowerCase()).previousNode();
            }
            if (node) {
                func(node, e);
            }
        });
    }
}