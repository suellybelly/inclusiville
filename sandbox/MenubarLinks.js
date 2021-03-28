var Menubar = function (domNode) {
  e = domNode.firstElementChild;
  while (e) {
    e = e.nextElementSibling; 
  }
  this.domNode = domNode;
  this.menubarItems = []; // See Menubar init method
  this.firstItem = null; // See Menubar init method
  this.lastItem = null; // See Menubar init method
  this.hasFocus = false; // See MenubarItem handleFocus, handleBlur
};

Menubar.prototype.init = function () {
  var menubarItem, menuElement, numItems;
  elem = this.domNode.firstElementChild;
  while (elem) {
    var menuElement = elem.firstElementChild;
    if (elem && menuElement) {
      menubarItem = new MenubarItem(menuElement, this);
      menubarItem.init();
      this.menubarItems.push(menubarItem);
    }
    elem = elem.nextElementSibling;
  }
  // Use populated menuitems array to initialize firstItem and lastItem.
  numItems = this.menubarItems.length;
  if (numItems > 0) {
    this.firstItem = this.menubarItems[ 0 ];
    this.lastItem = this.menubarItems[ numItems - 1 ];
  }
  this.firstItem.domNode.tabIndex = 0;
};

/* FOCUS MANAGEMENT METHODS */

Menubar.prototype.setFocusToItem = function (newItem) {
  for (var i = 0; i < this.menubarItems.length; i++) {
    var mbi = this.menubarItems[i];
    mbi.domNode.tabIndex = -1;
  }
  newItem.domNode.focus();
  newItem.domNode.tabIndex = 0;
};

Menubar.prototype.setFocusToFirstItem = function () {
  this.setFocusToItem(this.firstItem);
};

Menubar.prototype.setFocusToLastItem = function () {
  this.setFocusToItem(this.lastItem);
};

Menubar.prototype.setFocusToPreviousItem = function (currentItem) {
  var index;
  if (currentItem === this.firstItem) {
    newItem = this.lastItem;
  }
  else {
    index = this.menubarItems.indexOf(currentItem);
    newItem = this.menubarItems[ index - 1 ];
  }
  this.setFocusToItem(newItem);
};

Menubar.prototype.setFocusToNextItem = function (currentItem) {
  var index;
  if (currentItem === this.lastItem) {
    newItem = this.firstItem;
  }
  else {
    index = this.menubarItems.indexOf(currentItem);
    newItem = this.menubarItems[ index + 1 ];
  }
  this.setFocusToItem(newItem);
};
