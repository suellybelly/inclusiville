//
// JS Globals
//

;(function ($) {

  var caption = document.getElementById("caption");
  var step1 = $(".step-1");
  var step2 = $(".step-2");
  var step3 = $(".step-3");
  var step1NextBtn = $(".step-1 .next");
  var step2NextBtn = $(".step-2 .next");
  var step2PrevBtn = $(".step-2 .prev");
  var step3PrevBtn = $(".step-3 .prev");
  var resetBtn = $(".reset");
  var toggleBtn = $("#toggle-overlay-button");
  var disclaimerBtn = $("#disclaimer-button");
  var disclaimerCloseBtn = $("#disclaimer .close");
  var overlay = $("#overlay");
  var disclaimer = $("#disclaimer");
  var correctAnswers = false;

  axe._tree = axe.utils.getFlattenedTree(document.body);

  window.inclusiville = {
    setTabindex: function (el, tabindex) {
        var el = Array.from(el);
        el.forEach(function (e){
          if (e.getAttribute("tabindex") == undefined) {
              e.setAttribute( "tabindex", tabindex );
          }
        });
    },
    getAxeAriaValues: function (element) {
      var ariaRole = axe.commons.aria.getRole(element, axe._tree);
      var ariaText = axe.commons.text.accessibleText(element,  axe._tree);
      var activeAriaProps = {};
      ariaRole ? activeAriaProps.ariaRole = ariaRole : activeAriaProps.ariaRole = "";
      ariaText ? activeAriaProps.ariaText = ariaText : activeAriaProps.ariaText = "";
      return activeAriaProps;
    },
  };

// quiz form
var quizForm = document.getElementById('quiz-form');
var inputs = quizForm.getElementsByClassName('form-control');
quizForm.addEventListener('submit', function(event) {
    event.stopPropagation();
    event.preventDefault();
    quizForm.classList.add('was-validated');
    Array.from(inputs).forEach(function (input){
        var value = input.value ? input.value.toLowerCase() : null;
        var answer = input.getAttribute("answer").toLowerCase();
        if (value != answer || value === null) {
            correctAnswers = false;
            return false;
        }
        correctAnswers = true;
        input.parentNode.parentNode.classList.add("active");
        input.disabled = true;
    })
}, false);

// event registration form
var registrationCheck = document.getElementById('registered');
var regForm = document.getElementById('registration-form');
var status = document.getElementById('status');
regForm.addEventListener('submit', function(event) {
    event.preventDefault();
    event.stopPropagation();
    regForm.classList.add('was-validated');
    if (regForm.checkValidity() === false) {
        caption.textContent = "All fields are required. Please enter valid values.";
    } else {
        registrationCheck.parentNode.classList.add('active');
        registrationCheck.value="registered";
        regForm.style.display = "none";
        status.style.display = "block";
        caption.textContent = status.textContent;
    }
}, false);

// steps
step1NextBtn.on("click", function () {
    $("[class^=step-]").stop().fadeOut("fast");
    step2.fadeIn("fast");
});
step2PrevBtn.on("click", function () {
    $("[class^=step-]").fadeOut("fast");
    step1.fadeIn("fast");
});
step2NextBtn.on("click", function () {
    if (correctAnswers) {
        $("[class^=step-]").stop().fadeOut("fast");
        step3.fadeIn("fast");
        overlay.addClass("finished");
    }
});
step3PrevBtn.on("click", function () {
    $("[class^=step-]").stop().fadeOut("fast");
    step2.fadeIn("fast");
    overlay.removeClass("finished");
});
resetBtn.on("click", function () {
    // reset forms
    $(".list-group-item").removeClass("active");
    registrationCheck.parentNode.classList.remove('active');
    registrationCheck.value="";
    regForm.style.display = "block";
    status.style.display = "none";
    caption.textContent = "";      
    $(".needs-validation input").attr("disabled", false);  
    $(".needs-validation input").val("");  
    $(".needs-validation").removeClass("was-validated");
    // ui
    $("[class^=step-]").stop().fadeOut("fast");
    step1.fadeIn("fast");
    overlay.removeClass("finished");
});
toggleBtn.on("click", function () {
    overlay.stop().fadeOut("fast").delay(3000).fadeIn("fast");
    //overlay.fadeToggle("fast");
});
disclaimerBtn.on("click", function () {
    $("html").addClass("disclaimer-open");
    disclaimer.fadeIn("fast");
});
disclaimerCloseBtn.on("click", function () {
    $("html").removeClass("disclaimer-open");
    disclaimer.fadeOut("fast");
});
var keyCode = {
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
};

window.addEventListener("keydown", function (e){
var currentFocus = document.activeElement;
switch (e.keyCode) {
    case keyCode.TAB:
        break;
    case keyCode.LEFT:
    case keyCode.UP:
        focusPreviousElement(currentFocus);
        break;
    case keyCode.RIGHT:
    case keyCode.DOWN:
        focusNextElement(currentFocus);
        break;
    default:
        break;
}
});

// ignore tab for elements inside overlay
var overlayChildren = document.querySelectorAll("#overlay *");
inclusiville.setTabindex(overlayChildren, -1);

// get aria role and screen reader text from axe
var tabbableElements = document.querySelectorAll("#content *");
tabbableElements.forEach(function(e){
    e.addEventListener('focus', function (){
        var activeElement = document.activeElement;
        var aria = inclusiville.getAxeAriaValues(activeElement);
        caption.textContent = aria.ariaRole + " " + aria.ariaText;
    });
});

})(jQuery);
