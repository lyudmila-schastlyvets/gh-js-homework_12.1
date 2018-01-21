import '../sass/style.scss'

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
                this.style.left = - direction + 'px';
                if (this.previousElementSibling === null) {
                    var lastStyle = container.querySelector('ul').lastElementChild.style;
                    lastStyle.opacity = '1';
                    lastStyle.left = - direction + 'px';
                } else {
                    this.previousElementSibling.style.opacity = '1';
                    this.previousElementSibling.style.left = - direction + 'px';
                }
                if (this.nextElementSibling === null) {
                    var firstStyle = container.querySelector('ul').firstElementChild.style;
                    firstStyle.opacity = '1';
                    firstStyle.left = - direction + 'px';
                } else {
                    this.nextElementSibling.style.left = - direction + 'px';
                }
            }
            move = true;
        }, true);
        container.querySelectorAll('li')[i].addEventListener('mouseup', function () {
            if (move) {
                startPoint = 0;
                for (var j = 0; j < amount; j++) {
                    var li = container.querySelectorAll('li')[j];
                    li.style.left = 0;
                }
                if (direction > 0) {
                    left();
                } else {
                    right();
                }
                direction = 0;
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
