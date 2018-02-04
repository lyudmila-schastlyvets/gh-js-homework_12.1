import '../sass/style.scss'

var translatesArray = [];
var indexes = [];
var translationComplete = true;
var transitionCompleted = function () {
    translationComplete = true;
};
var startPoint  = 0;
var direction;
var move = false;

document.addEventListener('DOMContentLoaded', function () {
    var sliders = document.getElementsByClassName('single-slider-container');
    for (var i=0; i < sliders.length; i++) {
        indexes.push(0);
        translatesArray.push([]);
    }
    Array.prototype.forEach.call(sliders, function (slider, ind) {
        var containerWidth = slider.clientWidth;
        var amount = slider.querySelectorAll('li').length;
        var indicatorList = slider.getElementsByClassName('indicators');
        for (var i = 0; i < amount; i++) {
            var child = document.createElement('span');
            child.dataset.id = '' + i;
            indicatorList[0].appendChild(child);
            translatesArray[ind][i] = -containerWidth;
            slider.querySelectorAll('li')[i].addEventListener('transitionend', transitionCompleted, true);
            slider.querySelectorAll('li')[i].addEventListener('webkitTransitionEnd', transitionCompleted, true);
            slider.querySelectorAll('li')[i].addEventListener('oTransitionEnd', transitionCompleted, true);
            slider.querySelectorAll('li')[i].addEventListener('MSTransitionEnd', transitionCompleted, true);
            slider.querySelectorAll('li')[i].addEventListener('mousedown', function (event) {
                startPoint = event.offsetX + this.getBoundingClientRect().x;
            }, true);

            slider.querySelectorAll('li')[i].addEventListener('mousemove', function (event) {
                direction = startPoint - event.clientX;
                if (startPoint && translationComplete) {
                    for (var i = 0; i < amount; i++) {
                        slider.querySelectorAll('li')[i]
                            .style.transitionDuration = '1s';
                        slider.querySelectorAll('li')[i]
                            .style.transform = 'translate(' + (translatesArray[ind][i] - direction) + 'px)';
                        slider.querySelectorAll('li')[i]
                            .style.opacity = '1';
                    }
                    move = true;
                }
            }, true);

            slider.querySelectorAll('li')[i].addEventListener('mouseout', function () {
                if (startPoint && move) {
                    if (direction > 0) {
                        left(slider, ind, amount);
                    } else if (direction < 0) {
                        right(slider, ind, amount);
                    }
                    startPoint = 0;
                }
            });

            slider.querySelectorAll('li')[i].addEventListener('mouseup', function () {
                if (move) {
                    if (direction > 0) {
                        left(slider, ind, amount);
                    } else {
                        right(slider, ind, amount);
                    }
                    direction = 0;
                    startPoint = 0;
                    move = false;
                }
            }, true);

            slider.querySelectorAll('li')[i].addEventListener('touchstart', function (event) {
                direction = startPoint - event.clientX;
                if (startPoint) {
                    for (var i = 0; i < amount; i++) {
                        slider.querySelectorAll('li')[i]
                            .style.transform = 'translate(' + (translatesArray[ind][i] - direction) + 'px)';
                    }
                }
                move = true;
            }, true);

            slider.querySelectorAll('li')[i].addEventListener('touchend', function () {
                if (move) {
                    translationComplete = true;
                    if (direction > 0) {
                        left(slider, ind, amount);
                    } else {
                        right(slider, ind, amount);
                    }
                    direction = 0;
                    startPoint = 0;
                    move = false;
                }
            }, true);

            slider.querySelectorAll('li')[i].addEventListener('click', function (event) {
                if (event.offsetX > 200) {
                    right(slider, ind, amount);
                } else {
                    left(slider, ind, amount);
                }
            });

            indicatorList[0].querySelectorAll('span')[i].addEventListener('click', function (event) {
                var newIndicator = parseInt(event.target.dataset.id);
                for (var k = 0; k < amount; k++) {
                    indicatorList[0].querySelectorAll('span')[k].classList.remove('active');
                }
                event.target.classList.add('active');
                for (var i = 0; i < amount; i++) {
                    var li = slider.querySelectorAll('li')[i];
                    if (newIndicator !== 0) {
                        if (i >= (newIndicator - 1)) {
                            translatesArray[ind][i] = -slider.clientWidth * newIndicator;
                        } else {
                            translatesArray[ind][i] = slider.clientWidth * amount - slider.clientWidth * newIndicator;
                        }
                    } else {
                        translatesArray[ind][i] = 0;
                        if (i + 1 === amount) {
                            translatesArray[ind][amount - 1] = -slider.clientWidth * amount;
                        }
                    }
                    li.style.transitionDuration = '0s';
                    li.style.opacity = '1';
                    li.style.transform = 'translate(' + (translatesArray[ind][i]) + 'px)';
                }
                if (newIndicator % amount === 0) {
                    indexes[ind] = 0;
                } else {
                    indexes[ind] = newIndicator - 1;
                }
                if (newIndicator === 0) {
                    indexes[ind] = amount - 1;
                }
            });
        }
    });
});

// Right moving items
function right (container, position, amount) {
    var containerWidth = container.clientWidth;
    if (translationComplete) {
        translationComplete = false;
        indexes[position] = indexes[position] - 1;
        if (indexes[position] === -1) {
            indexes[position] = amount - 1;
        }
        var outerIndex = (indexes[position]) % amount;
        for (var i = 0; i < amount; i++) {
            var li = container.querySelectorAll('li')[i];
            li.style.transitionDuration = '1s';
            li.style.opacity = '1';
            li.style.transform = 'translate(' + (translatesArray[position][i] + containerWidth) + 'px)';
            translatesArray[position][i] = translatesArray[position][i] + containerWidth;
        }
        for (var k = 0; k < amount; k++) {
            container.querySelectorAll('span')[k].classList.remove('active');
        }
        container.querySelectorAll('span')[(indexes[position] + 1) % amount].classList.add('active');
        var outerLi = container.querySelectorAll('li')[outerIndex];
        outerLi.style.transform = 'translate(' + (translatesArray[position][outerIndex] - containerWidth * amount) + 'px)';
        outerLi.style.opacity = '0';
        translatesArray[position][outerIndex] = translatesArray[position][outerIndex] - containerWidth * amount;
    }
}

// Left moving items
function left (container, position, amount) {
    var containerWidth = container.clientWidth;
    if (translationComplete) {
        translationComplete = false;
        indexes[position] = indexes[position] + 1;
        var outerIndex = (indexes[position] - 1) % amount;
        for (var i = 0; i < amount; i++) {
            var li = container.querySelectorAll('li')[i];
            li.style.transitionDuration = '1s';
            li.style.opacity = '1';
            li.style.transform = 'translate(' + (translatesArray[position][i] - containerWidth) + 'px)';
            translatesArray[position][i] = translatesArray[position][i] - containerWidth;
        }
        for (var k = 0; k < amount; k++) {
            container.querySelectorAll('span')[k].classList.remove('active');
        }
        container.querySelectorAll('span')[(indexes[position] + 1) % amount].classList.add('active');
        var outerLi = container.querySelectorAll('li')[outerIndex];
        outerLi.style.transform =
            'translate(' + (translatesArray[position][outerIndex] + containerWidth * amount) + 'px)';
        outerLi.style.opacity = '0';
        translatesArray[position][outerIndex] =
            translatesArray[position][outerIndex] + containerWidth * amount;
    }
}