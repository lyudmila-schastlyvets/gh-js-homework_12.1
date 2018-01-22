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
            if (startPoint && translationComplete) {
                for (var i = 0; i < amount; i++) {
                    container.querySelectorAll('li')[i]
                        .style.transform = 'translate(' + (currTransl[i] - direction ) + 'px)';
                }
            }
            move = true;
        }, true);

        container.querySelectorAll('li')[i].addEventListener('mouseout', function () {
            if (startPoint) {
                startPoint = 0;
                if (direction > 0) {
                    left();
                } else {
                    right();
                }
            }
        });

        container.querySelectorAll('li')[i].addEventListener('mouseup', function () {
            if (move) {
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

        container.querySelectorAll('li')[i].addEventListener('touchend', function () {
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
    }

    document.getElementById('slider-1').addEventListener('click', function (event) {
        if (event.offsetX > 200) {
            right();
        } else {
            left();
        }
    });

});

// Right moving items
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

// Left moving items
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