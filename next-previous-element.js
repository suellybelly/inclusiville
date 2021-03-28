"use strict";

// Find the next element in an in-order traversal of a tree of nodes.
export function getNextElement(element) {
    if (!element) {
        return null;
    }

    // The next element is either this one's first child...
    var nextElement = null;
    if (element.firstElementChild) {
        nextElement = element.firstElementChild;
    }

    // ...or the next sibling...
    else if (element.nextElementSibling) {
        nextElement = element.nextElementSibling;
    }

    // ...or the next sibling for the first ancestor that has one.
    else {
        var current = element;
        while (true) {
            if (current.parentElement) {
                var parentElement = current.parentElement;
                if (parentElement.nextElementSibling) {
                    nextElement = parentElement.nextElementSibling;
                    break;
                }
                else {
                    current = parentElement;
                }
            }
            else {
                break;
            }
        }
    }

    return nextElement;
}

// Find the previous element in an in-order traversal of a tree of nodes.
export function getPreviousElement(element) {

    if (!element) {
        return null;
    }

    // The previous element is either this one's previous sibling
    var previousElement = null;
    if (element.previousElementSibling) {
        previousElement = element.previousElementSibling;
    }

    // ...or its parent
    else {
        previousElement = element.parentElement;
    }

    return previousElement;
}