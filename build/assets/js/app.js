function focusNextElement(e){var t=null;if(e.firstElementChild)t=e.firstElementChild;else if(e.nextElementSibling)t=e.nextElementSibling;else for(var a=e;a.parentElement;){var n=a.parentElement;if(n.nextElementSibling){t=n.nextElementSibling;break}a=n}t.focus(),t.tabIndex=0}function focusPreviousElement(e){var t=null;(t=e.previousElementSibling?e.previousElementSibling:e.parentElement).focus(),t.tabIndex=0}!function(a){window.WPHJS={GOOGLE_MAPS_API_KEY:"AIzaSyBVrrJLTmmDoRk5nCE3xglH496gj1Ff-gE",childrenTotalHeight:function(e){var t=0;return a(e).find("> *").each(function(){t+=a(this).outerHeight()}),t},getContainerOuterWidth:function(){var e=a('<div class="container"/>').appendTo(a("body")),t=e.outerWidth();return e.remove(),t},getContainerInnerWidth:function(){var e=a('<div class="container"><div></div></div>').appendTo(a("body")),t=e.find("> div").outerWidth();return e.remove(),t}}}(jQuery),function(h){"use strict";var e=function(e){e.version="0.1.0";var l=function(e){this.message=e,this.toString=function(){return this.constructor.name+": "+this.message}},t=function(e){this.firstWeekDay=e||0};t.prototype={constructor:t,weekStartDate:function(e){for(var t=new Date(e.getTime());t.getDay()!==this.firstWeekDay;)t.setDate(t.getDate()-1);return t},monthDates:function(e,t,a,n){if("number"!=typeof e||e<1970)throw new l("year must be a number >= 1970");if("number"!=typeof t||t<0||11<t)throw new l("month must be a number (Jan is 0)");var i=[],o=[],s=0,r=this.weekStartDate(new Date(e,t,1));do{for(s=0;s<7;s++)o.push(a?a(r):r),(r=new Date(r.getTime())).setDate(r.getDate()+1);i.push(n?n(o):o),o=[]}while(r.getMonth()<=t&&r.getFullYear()===e);return i},monthDays:function(e,t){return this.monthDates(e,t,function(e){return e.getMonth()===t?e.getDate():0})},monthText:function(e,a){if(void 0===e){var t=new Date;e=t.getFullYear(),a=t.getMonth()}return this.monthDates(e,a,function(e){for(var t=e.getMonth()===a?e.getDate().toString():"  ";t.length<2;)t=" "+t;return t},function(e){return e.join(" ")}).join("\n")}};for(var a="JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC".split(" "),n=0;n<a.length;n++)t[a[n]]=n;return e.Calendar=t,e.Calendar}({}),g=function(e,t){return e=new Date(e.getFullYear(),e.getMonth(),e.getDate()).valueOf(),((t=new Date(t.getFullYear(),t.getMonth(),t.getDate()).valueOf())<e)-(e<t)},r=function(e){return[e.getFullYear(),(e.getMonth()+1+"").padStart(2,"0"),(e.getDate()+"").padStart(2,"0")].join("-")},m=function(e){return new Date(e.getFullYear(),e.getMonth(),1)},y=function(e){return new Date(e.getFullYear(),e.getMonth()+1,0)},t=new Date,l={year:t.getFullYear(),month:t.getMonth(),firstWeekDay:1,dayItemContents:["month-full","day"],months:[{short:"Jan",full:"January"},{short:"Feb",full:"February"},{short:"Mar",full:"March"},{short:"Apr",full:"April"},{short:"May",full:"May"},{short:"Jun",full:"June"},{short:"Jul",full:"July"},{short:"Aug",full:"August"},{short:"Sep",full:"September"},{short:"Oct",full:"October"},{short:"Nov",full:"November"},{short:"Dec",full:"December"}],weekdays:[{short:"Sun",full:"Sunday"},{short:"Mon",full:"Monday"},{short:"Tue",full:"Tuesday"},{short:"Wed",full:"Wednesday"},{short:"Thu",full:"Thursday"},{short:"Fri",full:"Friday"},{short:"Sat",full:"Saturday"}]};h.fn.calendar=function(c){c=h.extend(l,c);var u=new e(c.firstWeekDay),t=h(this),f=new Date(c.year,c.month),n=h('<div class="calendar-month-selector"/>').appendTo(t),a=h('<div class="calendar-weekdays-container"/>').appendTo(t),p=h('<div class="calendar-dates-container"/>').appendTo(t),i=h('<input type="date" class="calendar-native-input form-control"/>').appendTo(t);c.nativeInputName&&i.attr("name",c.nativeInputName),c.maxDate&&i.attr("max",r(c.maxDate)),c.minDate&&i.attr("min",r(c.minDate));var o=function(e){n.empty().append(h('<button class="btn btn-square btn-light btn-sm prev-month"/>').html('<i class="material-icons">keyboard_arrow_left</i>'),h('<div class="current-month"/>').text(c.months[e.getMonth()].full+" "+e.getFullYear()),h('<button class="btn btn-square btn-light btn-sm next-month"/>').html('<i class="material-icons">keyboard_arrow_right</i>'));var t=new Date(e.getFullYear(),e.getMonth()-1);c.minDate&&1===g(c.minDate,y(t))&&n.find(".prev-month").addClass("disabled");var a=new Date(e.getFullYear(),e.getMonth()+1);c.maxDate&&-1===g(c.maxDate,m(a))&&n.find(".next-month").addClass("disabled")},s=function(e){p.empty();for(var t,a,n=u.monthDates(e.getFullYear(),e.getMonth()),i=0;i<n.length;i++)for(var o=n[i],s=0;s<o.length;s++){var r=o[s],l=["calendar-date","weekday-"+(r.getDay()+1)];switch(a=f,t=12*(t=r).getFullYear()+t.getMonth(),((a=12*a.getFullYear()+a.getMonth())<t)-(t<a)){case-1:l.push("prev-month");break;case 0:l.push("current-month");break;case 1:l.push("next-month")}0===g(r,y(r))?l.push("last-date-of-month"):0===g(r,m(r))&&l.push("first-date-of-month"),c.selectedDay&&0===g(r,c.selectedDay)&&l.push("selected"),(c.maxDate&&1===g(r,c.maxDate)||c.minDate&&-1===g(r,c.minDate))&&l.push("disabled");var d=h("<div/>",{class:l.join(" ")}).data("date",r).appendTo(p);h("<div/>",{class:"calendar-date-content"}).appendTo(d).append(h.map(c.dayItemContents,function(e){return"month-full"===e?h('<div class="month-full"/>').text(c.months[r.getMonth()].full):"month-short"===e?h('<div class="month-short"/>').text(c.months[r.getMonth()].short):"day"===e?h('<div class="day"/>').text(r.getDate()):"weekday-full"===e?h('<div class="weekday-full"/>').text(c.weekdays[r.getDay()].full):"weekday-short"===e?h('<div class="weekday-short"/>').text(c.weekdays[r.getDay()].short):void 0}))}};return o(f),function(){a.empty();for(var e=0;e<c.weekdays.length;e++){var t=(e+c.firstWeekDay)%c.weekdays.length;a.append(h('<div class="weekday"/>').text(c.weekdays[t].short))}}(),s(f),t.on("click",".calendar-date:not(.disabled)",function(){var e=h(this).addClass("selected");t.find(".calendar-date").not(e).removeClass("selected"),t.trigger("select-a-date",[e.data("date")]),i.val(r(e.data("date")))}),n.on("click",".prev-month:not(.disabled), .next-month:not(.disabled)",function(){var e=h(this);f=e.hasClass("prev-month")?new Date(f.getFullYear(),f.getMonth()-1):new Date(f.getFullYear(),f.getMonth()+1),o(f),s(f)}),i.on("change",function(){var e=new Date(this.value);c.selectedDay=new Date(e.getFullYear(),e.getMonth(),e.getDate()),f=new Date(c.selectedDay.getFullYear(),c.selectedDay.getMonth()),o(f),s(f),t.trigger("select-a-date",[c.selectedDay])}),t.trigger("init"),this},h(".calendar").calendar({minDate:t,maxDate:new Date(t.getFullYear(),t.getMonth(),t.getDate()+90),selectedDay:new Date,dayItemContents:["month-short","day"]}).on("select-a-date",function(e,t){console.log(t)})}(jQuery),function(s){"use strict";var e=s(".card-slider"),t=function(e){var t=WPHJS.getContainerInnerWidth(),a=s(window).outerWidth(),n="ready"===e.type&&"flickity"===e.namespace,i=a<576?0:(a-t)/2;if(s(this).find(".card-slider-item:first").css("padding-left",i),s(this).find(".card-slider-item:last").css("padding-right",i),s(this).css({marginLeft:-1*i,marginRight:-1*i}),s(this).data("flickity"))s(this).flickity("resize");else if(n){var o=this;setTimeout(function(){s(o).flickity("resize")},0)}};e.filter(".card-slider-viewport").on("ready.flickity",t),s(window).on("resize",function(){e.filter(".card-slider-viewport").each(t)}),s('[data-target][data-action][data-toggle="card-slider"]').each(function(){var i=s(this),t=s(i.data("target")),o=i.data("action");"prevSlide"===o?i.on("click",function(e){e.preventDefault(),t.flickity("previous")}):"nextSlide"===o&&i.on("click",function(e){e.preventDefault(),t.flickity("next")}),t.on("ready.flickity change.flickity",function(){var n=this;setTimeout(function(){var e=s(n).data("flickity"),t=e.slides.length?e.slides.length-1:0,a="prevSlide"===o?0:t;i.toggleClass("disabled",!e.options.wrapAround&&e.selectedIndex===a),i.prop("disabled",!e.options.wrapAround&&e.selectedIndex===a)},0)})}),s('[data-target][data-control="card-slider-dots"]').each(function(){var o=s(this);s(o.data("target")).on("ready.flickity change.flickity",function(){var i=this;setTimeout(function(){var t=s(i).data("flickity");o.html('<ul class="card-slider-dots"></ul>');for(var e=o.find(".card-slider-dots"),a=0;a<t.slides.length;a++){var n=s('<li class="card-slider-dot"/>');n.append(s('<a href="#"/>').data("index",a).text(a+1)),a===t.selectedIndex&&n.addClass("card-slider-dot-active"),e.append(n)}o.find("a").on("click",function(e){e.preventDefault(),t.select(s(this).data("index"))})},0)})}),e.each(function(){s(this).flickity(s.extend({imagesLoaded:!0,watchCSS:!0,groupCells:!0,percentPosition:!1,cellAlign:"left",sellSelector:".card-slider-item",prevNextButtons:!1,pageDots:!1,contain:!0},s(this).data("options")))})}(jQuery),function(i){"use strict";var o=i(".custom-checkbox, .custom-radio");o.each(function(){var t=i(this),e="custom-"+t.attr("type"),a=i("<div/>",{class:e+"-wrap"}),n=i("<div/>",{class:e+"-presenter"});t.wrap(a),(a=t.parent()).append(n),t.on("refresh",function(e){e.stopPropagation(),t.prop("checked")?a.addClass("checked"):a.removeClass("checked")}),t.on("change",function(){o.trigger("refresh")}),n.on("click",function(e){e.stopPropagation(),"radio"===t.attr("type")?t.prop("checked",!0):t.prop("checked",!t.prop("checked")),t.trigger("change")}),t.trigger("change")})}(jQuery),function(e){"use strict";e(".faq").on("hide.bs.collapse",function(){e(this).removeClass("faq-open")}).on("show.bs.collapse",function(){e(this).addClass("faq-open")})}(jQuery),function(n){"use strict";n(".form-collapsible-section").each(function(){var e=n(this),t=e.find(".form-collapsible-section-head"),a=e.find(".form-collapsible-section-body");t.on("click",function(){a.collapse("toggle")}),a.addClass("collapse"),"true"===e.attr("aria-expanded")&&a.addClass("show")}).on("hide.bs.collapse",function(){n(this).attr("aria-expanded",!1)}).on("show.bs.collapse",function(){n(this).attr("aria-expanded",!0)})}(jQuery),function(n){"use strict";var a=[];n(".form-selectable-label[data-input]").each(function(){var e=n(this).attr("data-input"),t=document.querySelector(e);t&&a.push(t)}).on("click",function(e){var t=n(this).attr("data-input"),a=n(t);a&&(a.is('[type="radio"]')?a.prop("checked",!0):a.prop("checked",!a.prop("checked")),a.trigger("change"))});var t=function(){var e=n(this),t=e.closest(".form-selectable-label");e.prop("checked")?t.addClass("selected"):t.removeClass("selected")};n(a).each(t).on("change",function(){n(a).trigger("refresh")}).on("refresh",function(e){e.stopPropagation(),t.apply(this)})}(jQuery),function(e){"use strict";var t=e(".header"),a=t.next(".header-spacing-helper");a.length||(a=e('<div class="header-spacing-helper"/>').insertAfter(t)),a.css("height",t.outerHeight());var n=e("body"),i=function(){150<window.scrollY?n.addClass("page-scrolled"):n.removeClass("page-scrolled")};e(window).on("scroll",i),e(i)}(jQuery),function(t){"use strict";var a=function(e){return t(e).hasClass("hero-fullscreen")?function(){e.each(function(){var e;t(this).css("min-height",(e=this,Math.max(t(window).outerHeight()-t(e).position().top,WPHJS.childrenTotalHeight(t(e).find(".hero-foreground")))+"px"))})}:function(){}};t(".hero").each(function(){var e=t(this);e.imagesLoaded(function(){e.hasClass("jarallax")?jarallax(e.get(0),{videoSrc:e.attr("data-video"),automaticResize:!0,onInit:function(){t(a(e)),t(window).on("resize orientationchange",a(e)),e.addClass("hero-bg-ready")}}):(t(a(e)),t(window).on("resize orientationchange",a(e)),e.addClass("hero-bg-ready"))})})}(jQuery),function(o){"use strict";var e=o(".image-slider");e.find(".image-slider-prev, .image-slider-next").on("click",function(e){var t=o(this),a=t.closest(".image-slider").find(".image-slider-contents");"function"==typeof a.flickity&&(e.preventDefault(),t.hasClass("image-slider-prev")&&a.flickity("previous"),t.hasClass("image-slider-next")&&a.flickity("next"))}),e.find(".image-slider-contents").on("ready.flickity change.flickity",function(){var a=this,e=o(a).closest(".image-slider"),n=e.find(".image-slider-prev"),i=e.find(".image-slider-next");setTimeout(function(){var e=o(a).data("flickity"),t=e.slides.length?e.slides.length-1:0;n.toggleClass("disabled",0===e.selectedIndex).prop("disabled",0===e.selectedIndex),i.toggleClass("disabled",e.selectedIndex===t).prop("disabled",e.selectedIndex===t)},0)}),e.find(".image-slider-contents").flickity({draggable:!0,imagesLoaded:!0,watchCSS:!1,groupCells:!1,percentPosition:!1,adaptiveHeight:!0,sellSelector:".image-slider-item",prevNextButtons:!1,pageDots:!1})}(jQuery),jQuery(window).one("wph.google_maps_loaded",function(){"use strict";if("undefined"!=typeof google&&void 0!==google.maps){var l=jQuery,e=l(".gmap"),i={zoom:14,disableDefaultUI:!0,openFirstInfobox:!0,draggable:!0,styles:[{featureType:"water",elementType:"geometry.fill",stylers:[{color:"#d3d3d3"}]},{featureType:"transit",stylers:[{color:"#808080"},{visibility:"off"}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{visibility:"on"},{color:"#b3b3b3"}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{color:"#ffffff"}]},{featureType:"road.local",elementType:"geometry.fill",stylers:[{visibility:"on"},{color:"#ffffff"},{weight:1.8}]},{featureType:"road.local",elementType:"geometry.stroke",stylers:[{color:"#d7d7d7"}]},{featureType:"poi",elementType:"geometry.fill",stylers:[{visibility:"on"},{color:"#ebebeb"}]},{featureType:"administrative",elementType:"geometry",stylers:[{color:"#a7a7a7"}]},{featureType:"road.arterial",elementType:"geometry.fill",stylers:[{color:"#ffffff"}]},{featureType:"road.arterial",elementType:"geometry.fill",stylers:[{color:"#ffffff"}]},{featureType:"landscape",elementType:"geometry.fill",stylers:[{visibility:"on"},{color:"#efefef"}]},{featureType:"road",elementType:"labels.text.fill",stylers:[{color:"#696969"}]},{featureType:"administrative",elementType:"labels.text.fill",stylers:[{visibility:"on"},{color:"#737373"}]},{featureType:"poi",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"poi",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"road.arterial",elementType:"geometry.stroke",stylers:[{color:"#d6d6d6"}]},{featureType:"road",elementType:"labels.icon",stylers:[{visibility:"off"}]},{},{featureType:"poi",elementType:"geometry.fill",stylers:[{color:"#dadada"}]}],mapTypeId:"roadmap"};e.each(function(){var e=l(this).find(".gmap-embed-inner"),t=l(this).find(".gmap-infobox"),a=e.data("options"),n=parseInt(l(this).find(".gmap-embed").data("parallax-speed")),s=l.extend(i,a),r=new google.maps.Map(e.get(0),s);l(t.get().reverse()).each(function(){var e=l(this),t=e.data("latlng").split(" "),a={lat:parseFloat(t[0]),lng:parseFloat(t[1])};void 0===s.center&&r.setCenter(a);var n=!1,i=new GoogleMaps_InfoBox_Factory({content:e.html(),maxWidth:350,boxClass:"gmap-infobox",pixelOffset:new google.maps.Size(57,e.find(".gmap-infobox-header").outerHeight()/2*-1),closeBoxURL:"",zIndex:1,infoBoxClearance:new google.maps.Size(32,32),enableEventPropagation:!1}),o=new google.maps.Marker({position:a,map:r,icon:{url:"assets/images/map-marker.png",anchor:new google.maps.Point(31,31),scaledSize:new google.maps.Size(62,62)}});o.addListener("click",function(){n?i.close():i.open(r,o),n=!n})}),0!==n&&(e.css({top:-1*n/2,bottom:-1*n/2}),e.jarallax({type:"element",speed:n.toString()+" 0"}))})}}),function(e){"use strict";if(e(".gmap").length)if("undefined"==typeof google||void 0===google.maps){var t="https://maps.google.com/maps/api/js?key="+WPHJS.GOOGLE_MAPS_API_KEY;e.getScript(t,function(){e(window).trigger("wph.google_maps_loaded")})}else e(window).trigger("wph.google_maps_loaded")}(jQuery),function(e){"use strict";jQuery('[data-toggle="popover"]').popover()}(),function(i){"use strict";i(".radio-buttons-group-disabled .btn").addClass("disabled"),i(".radio-buttons-group:not(.radio-buttons-group-disabled)").each(function(){var a=i(this),n=a.find(".btn");n.on("click",function(e){e.preventDefault();var t=i(this);n.removeClass("selected"),t.addClass("selected"),a.trigger("change",t.data("value"))})})}(jQuery),function(n){"use strict";n(".shuffle-grid").each(function(){n(this).data("shufflejs-instance",new Shuffle(this,{itemSelector:".shuffle-grid-item",delimiter:","}))}).on("set-filter.shufflejs",function(e,t){n(this).closest(".shuffle-grid").data("shufflejs-instance").filter(-1!==["all","*"].indexOf(t)?Shuffle.ALL_ITEMS:t)}),n('.radio-buttons-group[data-toggle="shuffle-grid"][data-target]').on("change",function(e,t){var a=n(this);n(a.data("target")).trigger("set-filter.shufflejs",t)})}(jQuery),function(i){"use strict";var o=i(".header"),s=0;i('[data-toggle="smooth-scroll"]').on("click",function(e){e.preventDefault();var t=i(this).data("target")||i(this).attr("href"),a=document.querySelector(t);if("fixed"===o.css("position")&&(s=o.outerHeight()),a){var n=Math.max(0,i(a).offset().top-s);"scrollBehavior"in document.documentElement.style?window.scrollTo({top:n,behavior:"smooth"}):i("html, body").animate({scrollTop:n},1e3)}})}(jQuery),function(e){"use strict";jQuery(".sticky-sidebar").stickySidebar({topSpacing:30,bottomSpacing:30})}(),function(e){var a=document.getElementById("caption"),t=e(".step-1"),n=e(".step-2"),i=e(".step-3"),o=e(".step-1 .next"),s=e(".step-2 .next"),r=e(".step-2 .prev"),l=e(".step-3 .prev"),d=e(".reset"),c=e("#toggle-overlay-button"),u=e("#disclaimer-button"),f=e("#disclaimer .close"),p=e("#overlay"),h=e("#disclaimer"),g=!1;axe._tree=axe.utils.getFlattenedTree(document.body),window.inclusiville={setTabindex:function(e,t){(e=Array.from(e)).forEach(function(e){null==e.getAttribute("tabindex")&&e.setAttribute("tabindex",t)})},getAxeAriaValues:function(e){var t=axe.commons.aria.getRole(e,axe._tree),a=axe.commons.text.accessibleText(e,axe._tree),n={};return n.ariaRole=t||"",n.ariaText=a||"",n}};var m=document.getElementById("quiz-form"),y=m.getElementsByClassName("form-control");m.addEventListener("submit",function(e){e.stopPropagation(),e.preventDefault(),m.classList.add("was-validated"),Array.from(y).forEach(function(e){var t=e.value?e.value.toLowerCase():null;if(t!=e.getAttribute("answer").toLowerCase()||null===t)return g=!1;g=!0,e.parentNode.parentNode.classList.add("active"),e.disabled=!0})},!1);var v=document.getElementById("registered"),b=document.getElementById("registration-form"),w=document.getElementById("status");b.addEventListener("submit",function(e){e.preventDefault(),e.stopPropagation(),b.classList.add("was-validated"),!1===b.checkValidity()?a.textContent="All fields are required. Please enter valid values.":(v.parentNode.classList.add("active"),v.value="registered",b.style.display="none",w.style.display="block",a.textContent=w.textContent)},!1),o.on("click",function(){e("[class^=step-]").stop().fadeOut("fast"),n.fadeIn("fast")}),r.on("click",function(){e("[class^=step-]").fadeOut("fast"),t.fadeIn("fast")}),s.on("click",function(){g&&(e("[class^=step-]").stop().fadeOut("fast"),i.fadeIn("fast"),p.addClass("finished"))}),l.on("click",function(){e("[class^=step-]").stop().fadeOut("fast"),n.fadeIn("fast"),p.removeClass("finished")}),d.on("click",function(){e(".list-group-item").removeClass("active"),v.parentNode.classList.remove("active"),v.value="",b.style.display="block",w.style.display="none",a.textContent="",e(".needs-validation input").attr("disabled",!1),e(".needs-validation input").val(""),e(".needs-validation").removeClass("was-validated"),e("[class^=step-]").stop().fadeOut("fast"),t.fadeIn("fast"),p.removeClass("finished")}),c.on("click",function(){p.stop().fadeOut("fast").delay(3e3).fadeIn("fast")}),u.on("click",function(){e("html").addClass("disclaimer-open"),h.fadeIn("fast")}),f.on("click",function(){e("html").removeClass("disclaimer-open"),h.fadeOut("fast")});var x=9,k=37,D=38,T=39,C=40;window.addEventListener("keydown",function(e){var t=document.activeElement;switch(e.keyCode){case x:break;case k:case D:focusPreviousElement(t);break;case T:case C:focusNextElement(t)}});var S=document.querySelectorAll("#overlay *");inclusiville.setTabindex(S,-1),document.querySelectorAll("#content *").forEach(function(e){e.addEventListener("focus",function(){var e=document.activeElement,t=inclusiville.getAxeAriaValues(e);a.textContent=t.ariaRole+" "+t.ariaText})})}(jQuery);