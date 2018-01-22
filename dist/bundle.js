/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sass_style_scss__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sass_style_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__sass_style_scss__);


var index = 0;
var amount = 0;
var currTransl = [];
var translationComplete = true;
var transitionCompleted = function() {
    translationComplete = true;
};
var startPoint  = 0;
var direction;
var move = false;

document.addEventListener('DOMContentLoaded', function() {
    var container = document.getElementById('slider-1');
    var containerWidth = container.clientWidth;
    amount = container.querySelectorAll('li').length;
    for (var i = 0; i < amount; i++) {
        currTransl[i] = -containerWidth;
        container.querySelectorAll('li')[i].addEventListener('transitionend', transitionCompleted, true);
        container.querySelectorAll('li')[i].addEventListener('webkitTransitionEnd', transitionCompleted, true);
        container.querySelectorAll('li')[i].addEventListener('oTransitionEnd', transitionCompleted, true);
        container.querySelectorAll('li')[i].addEventListener('MSTransitionEnd', transitionCompleted, true);
        container.querySelectorAll('li')[i].addEventListener('mousedown', function (event) {
            var field = this.getBoundingClientRect();
            startPoint = event.offsetX + field.x;
        }, true);
        container.querySelectorAll('li')[i].addEventListener('mousemove', function (event) {
            var movePoint = event.clientX;
            direction = startPoint - movePoint;
            if (startPoint) {
                for (var i = 0; i < amount; i++) {
                    container.querySelectorAll('li')[i]
                        .style.transform = 'translate(' + (currTransl[i] - direction ) + 'px)';
                }
            }
            move = true;
        }, true);
        container.querySelectorAll('li')[i].addEventListener('mouseup', function () {
            if (move) {
                translationComplete = true;
                if (direction > 0) {
                    left();
                } else {
                    right();
                }
                direction = 0;
                startPoint = 0;
                move = false;
            }
        }, true);
        container.querySelectorAll('li')[i].addEventListener('touchstart', function (event) {

        }, true);
        container.querySelectorAll('li')[i].addEventListener('touchend', function (event) {

        }, true);
    }

    document.getElementById('slider-1').addEventListener('click', function (event) {
        if (event.offsetX > 200) {
            right();
        } else {
            left();
        }
    });

});

function right () {
    var container = document.getElementById('slider-1');
    var containerWidth = container.clientWidth;
    if (translationComplete === true) {
        translationComplete = false;
        index--;
        if (index === -1) {
            index = amount - 1;
        }
        var outerIndex = (index) % amount;
        for (var i = 0; i < amount; i++) {
            var li = container.querySelectorAll('li')[i];
            li.style.opacity = '1';
            li.style.transform = 'translate('+(currTransl[i]+containerWidth)+'px)';
            currTransl[i] = currTransl[i] + containerWidth;
        }

        var outerLi = container.querySelectorAll('li')[outerIndex];
        outerLi.style.transform = 'translate('+(currTransl[outerIndex]-containerWidth*(amount))+'px)';
        outerLi.style.opacity = '0';
        currTransl[outerIndex] = currTransl[outerIndex]-containerWidth*(amount);
    }
}

function left () {
    var container = document.getElementById('slider-1');
    var containerWidth = container.clientWidth;
    if (translationComplete === true) {
        translationComplete = false;
        index++;
        var outerIndex = (index-1) % amount;
        for (var i = 0; i < amount; i++) {
            var li = container.querySelectorAll('li')[i];
            li.style.opacity = '1';
            li.style.transform = 'translate('+(currTransl[i]-containerWidth)+'px)';
            currTransl[i] = currTransl[i]-containerWidth;
        }
        var outerLi = container.querySelectorAll('li')[outerIndex];
        outerLi.style.transform = 'translate('+(currTransl[outerIndex]+containerWidth*(amount))+'px)';
        outerLi.style.opacity = '0';
        currTransl[outerIndex] = currTransl[outerIndex]+containerWidth*(amount);
    }
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);