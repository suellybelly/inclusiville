// drills down to every branch
function focusNextElement(element) {
  var nextElement = null;

  // has children, get first child
  if (element.firstElementChild) {
    nextElement = element.firstElementChild;

  // next sibling
  } else if (element.nextElementSibling) {
    nextElement = element.nextElementSibling;

  // last element, so get the next parbling
  } else {
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

  // focus, update tabindex
  nextElement.focus();
  nextElement.tabIndex = 0;
}

// only folds upwards
function focusPreviousElement( element ) {
  var previousElement = null;

  // has siblings, get previous sibling
  if (element.previousElementSibling) {
    previousElement = element.previousElementSibling;

  // first child
  }  else {
    previousElement = element.parentElement;
  }
  
  // focus, update tabindex
  previousElement.focus();
  previousElement.tabIndex = 0;
}
