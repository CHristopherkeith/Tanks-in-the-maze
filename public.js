
var $ = function(el) {
    return document.querySelector(el);
}

var $$ = function(el) {
    return document.querySelectorAll(el);
}

var createEle = function(tagName) {
    return document.createElement(tagName);
}

// 兼容的事件方法
function addEvent(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent('on' + event, hanlder);
    } else {
        ele['on' + event] = hanlder;
    }
}

function removeEvent(ele, event, hanlder) {
    if (ele.removeEventListener) {
        ele.removeEventListener(event, hanlder, false);
    } else if (ele.detachEvent) {
        ele.detachEvent('on' + event, hanlder);
    } else {
        ele['on' + event] = null;
    }
}

function getEventTarget(event){
    return event.srcElement ? event.srcElement:event.target;
}

function getKeyCode(event){
    return eventKeycode=event.keycode ? event.keycode:event.which;
}
function preventDefault(event){
    if (event.preventDefault) {
        console.log("233")
        event.preventDefault();
    }
    else {
        event.returnvalue = false;
    }
}

// Cross-browser support for requestAnimationFrame
var requestAnimationFrame=window.requestAnimationFrame ||  
   window.webkitRequestAnimationFrame ||  
   window.mozRequestAnimationFrame ||  
   window.oRequestAnimationFrame ||  
   window.msRequestAnimationFrame;

var cancelAnimationFrame = window.cancelRequestAnimationFrame ||  
   window.webkitCancelAnimationFrame ||  
   window.webkitCancelRequestAnimationFrame ||  
   window.mozCancelRequestAnimationFrame ||  
   window.oCancelRequestAnimationFrame ||  
   window.msCancelRequestAnimationFrame;
