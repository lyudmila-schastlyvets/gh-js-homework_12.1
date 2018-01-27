import '../sass/style.scss'

var currTransl = [];
var indexes = [];
var translationComplete = true;
var transitionCompleted = function() {
    translationComplete = true;
};
var startPoint  = 0;
var direction;
var move = false;

document.addEventListener('DOMContentLoaded', function() {
    var sliders = document.getElementsByClassName('single-slider-container');
    for (var i=0; i < sliders.length; i++) {
        indexes.push(0);
        currTransl.push([]);
    }
    Array.prototype.forEach.call(sliders, function (el, ind) {
        var container = el;
        var containerWidth = container.clientWidth;
        var amount = container.querySelectorAll('li').length;
        for (var i = 0; i < amount; i++) {
            currTransl[ind][i] = -containerWidth;
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
                            .style.transform = 'translate(' + (currTransl[ind][i] - direction ) + 'px)';
                    }
                }
                move = true;
            }, true);

            container.querySelectorAll('li')[i].addEventListener('mouseout', function () {
                if (startPoint) {
                    startPoint = 0;
                    if (direction > 0) {
                        left(el, ind, amount);
                    } else {
                        right(el, ind, amount);
                    }
                }
            });

            container.querySelectorAll('li')[i].addEventListener('mouseup', function () {
                if (move) {
                    if (direction > 0) {
                        left(el, ind, amount);
                    } else {
                        right(el, ind, amount);
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
                            .style.transform = 'translate(' + (currTransl[ind][i] - direction) + 'px)';
                    }
                }
                move = true;
            }, true);

            container.querySelectorAll('li')[i].addEventListener('touchend', function () {
                if (move) {
                    translationComplete = true;
                    if (direction > 0) {
                        left(el, ind, amount);
                    } else {
                        right(el, ind, amount);
                    }
                    direction = 0;
                    startPoint = 0;
                    move = false;
                }
            }, true);
        }

        el.addEventListener('click', function (event) {
            if (event.offsetX > 200) {
                right(el, ind, amount);
            } else {
                left(el, ind, amount);
            }
        });
    });

});

// Right moving items
function right (box, ind_param, amount) {
    var container = box;
    var containerWidth = container.clientWidth;
    if (translationComplete === true) {
        translationComplete = false;
        indexes[ind_param]=indexes[ind_param]-1;
        if (indexes[ind_param] === -1) {
            indexes[ind_param] = amount - 1;
        }
        var outerIndex = (indexes[ind_param]) % amount;
        for (var i = 0; i < amount; i++) {
            var li = container.querySelectorAll('li')[i];
            li.style.opacity = '1';
            li.style.transform = 'translate('+(currTransl[ind_param][i]+containerWidth)+'px)';
            currTransl[ind_param][i] = currTransl[ind_param][i] + containerWidth;
        }

        var outerLi = container.querySelectorAll('li')[outerIndex];
        outerLi.style.transform = 'translate('+(currTransl[ind_param][outerIndex]-containerWidth*(amount))+'px)';
        outerLi.style.opacity = '0';
        currTransl[ind_param][outerIndex] = currTransl[ind_param][outerIndex]-containerWidth*(amount);
    }
}

// Left moving items
function left (box, ind_param, amount) {
    var container = box;
    var containerWidth = container.clientWidth;
    if (translationComplete === true) {
        translationComplete = false;
        indexes[ind_param]=indexes[ind_param]+1;
        var outerIndex = (indexes[ind_param]-1) % amount;
        for (var i = 0; i < amount; i++) {
            var li = container.querySelectorAll('li')[i];
            li.style.opacity = '1';
            li.style.transform = 'translate('+(currTransl[ind_param][i]-containerWidth)+'px)';
            currTransl[ind_param][i] = currTransl[ind_param][i]-containerWidth;
        }
        var outerLi = container.querySelectorAll('li')[outerIndex];
        outerLi.style.transform = 'translate('+(currTransl[ind_param][outerIndex]+containerWidth*(amount))+'px)';
        outerLi.style.opacity = '0';
        currTransl[ind_param][outerIndex] = currTransl[ind_param][outerIndex]+containerWidth*(amount);
    }
}