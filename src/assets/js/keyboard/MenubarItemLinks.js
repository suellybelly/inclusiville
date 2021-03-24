var MenubarItem = function (domNode, menuObj) {
  this.menu = menuObj;
  this.domNode = domNode;
  this.hasFocus = false;
  this.keyCode = Object.freeze({
    'TAB': 9,
    'RETURN': 13,
    'ESC': 27,
    'SPACE': 32,
    'PAGEUP': 33,
    'PAGEDOWN': 34,
    'END': 35,
    'HOME': 36,
    'LEFT': 37,
    'UP': 38,
    'RIGHT': 39,
    'DOWN': 40
  });
};

MenubarItem.prototype.init = function () {
  this.domNode.tabIndex = -1;
  this.domNode.addEventListener('keydown', this.handleKeydown.bind(this));
  this.domNode.addEventListener('focus', this.handleFocus.bind(this));
  this.domNode.addEventListener('blur', this.handleBlur.bind(this));
};

MenubarItem.prototype.handleKeydown = function (event) {
  switch (event.keyCode) {
    //case this.keyCode.SPACE:
    //case this.keyCode.RETURN:
    case this.keyCode.DOWN:
      this.menu.setFocusToNextItem(this);
      console.log("keyCode.DOWN");
      break;
    case this.keyCode.LEFT:
      this.menu.setFocusToPreviousItem(this);
      console.log("keyCode.LEFT");
      break;
    case this.keyCode.RIGHT:
      this.menu.setFocusToNextItem(this);
      console.log("keyCode.RIGHT");
      break;
    case this.keyCode.UP:
      this.menu.setFocusToPreviousItem(this);
      console.log("keyCode.UP");
      break;
    case this.keyCode.HOME:
    case this.keyCode.PAGEUP:
      this.menu.setFocusToFirstItem();
      break;
    case this.keyCode.END:
    case this.keyCode.PAGEDOWN:
      this.menu.setFocusToLastItem();
      break;
    // case this.keyCode.TAB:
    // case this.keyCode.ESC:
    default:
      break;
  }
};

MenubarItem.prototype.handleFocus = function (event) {
  this.menu.hasFocus = true;
};

MenubarItem.prototype.handleBlur = function (event) {
  this.menu.hasFocus = false;
};
