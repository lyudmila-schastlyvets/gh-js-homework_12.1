import '../sass/style.scss'
// Create arrays for transform positions and current indexes of sliders
var translatesArray = [];
var indexes = [];
// Init variables for slides moving
var translationComplete = true;
var startPoint  = 0;
var direction;
var move = false;
// Set finish animation function
var transitionCompleted = function () {
    translationComplete = true;
};

document.addEventListener('DOMContentLoaded', function () {
    // First initialize
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
            // Create indicators for each slider
            var child = document.createElement('span');
            child.dataset.id = '' + i;
            indicatorList[0].appendChild(child);
            // Set base transforms for separate slider
            translatesArray[ind][i] = -containerWidth;
            // Check completing animation events
            slider.querySelectorAll('li')[i].addEventListener('transitionend', transitionCompleted, true);
            slider.querySelectorAll('li')[i].addEventListener('webkitTransitionEnd', transitionCompleted, true);
            slider.querySelectorAll('li')[i].addEventListener('oTransitionEnd', transitionCompleted, true);
            slider.querySelectorAll('li')[i].addEventListener('MSTransitionEnd', transitionCompleted, true);

            slider.querySelectorAll('li')[i].addEventListener('mousedown', function (event) {
                // Handle start point for moving
                startPoint = event.offsetX + this.getBoundingClientRect().x;
            }, true);

            slider.querySelectorAll('li')[i].addEventListener('mousemove', function (event) {
                // Check if previous events completed
                if (startPoint && translationComplete) {
                    // Set direction
                    direction = startPoint - event.clientX;
                    for (var i = 0; i < amount; i++) {
                        // Move slides styles
                        slider.querySelectorAll('li')[i].style.transitionDuration = '1s';
                        slider.querySelectorAll('li')[i]
                            .style.transform = 'translate(' + (translatesArray[ind][i] - direction) + 'px)';
                        slider.querySelectorAll('li')[i].style.opacity = '1';
                    }
                    move = true;
                }
            }, true);

            slider.querySelectorAll('li')[i].addEventListener('mouseout', function () {
                // Handle cursor moving outside slide borders
                if (startPoint && move) {
                    if (direction > 0) {
                        left(slider, ind, amount);
                    } else if (direction < 0) {
                        right(slider, ind, amount);
                    }
                    startPoint = 0;
                    direction = 0;
                    move = false;
                }
            });

            slider.querySelectorAll('li')[i].addEventListener('mouseup', function () {
                // Handle moving slides to the next after mouseup event
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
                startPoint = event.offsetX + this.getBoundingClientRect().x;
            }, true);

            slider.querySelectorAll('li')[i].addEventListener('touchend', function () {
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

            slider.querySelectorAll('li')[i].addEventListener('click', function (event) {
                // Check cursor position on click and move slides to the left or right side
                if (event.offsetX > 200) {
                    right(slider, ind, amount);
                } else {
                    left(slider, ind, amount);
                }
            });
            // Event for changing slides with bullets
            indicatorList[0].querySelectorAll('span')[i].addEventListener('click', function (event) {
                // Get indicator id from data attribute
                var newIndicator = parseInt(event.target.dataset.id);
                for (var k = 0; k < amount; k++) {
                    indicatorList[0].querySelectorAll('span')[k].classList.remove('active');
                }
                event.target.classList.add('active');
                for (var i = 0; i < amount; i++) {
                    var li = slider.querySelectorAll('li')[i];
                    // Set new transform positions for slides depend on active bullet (indicator)
                    if (newIndicator !== 0) {
                        // Change previous one and all the next slides positions to start of slider in transforms array
                        if (i >= (newIndicator - 1)) {
                            translatesArray[ind][i] = -slider.clientWidth * newIndicator;
                        } else {
                            // Change other slides positions to the end of slider list in transforms Array
                            translatesArray[ind][i] = slider.clientWidth * (amount - newIndicator);
                        }
                    } else {
                        // Transforms will be equal 0 when current slide index = 0
                        translatesArray[ind][i] = 0;
                        // Change last slide position to the very beginning of slider in transforms array
                        if (i + 1 === amount) {
                            translatesArray[ind][amount - 1] = -slider.clientWidth * amount;
                        }
                    }
                    // Styles for changing positions of slides
                    li.style.transitionDuration = '0s';
                    li.style.opacity = '1';
                    li.style.transform = 'translate(' + (translatesArray[ind][i]) + 'px)';
                }
                // Set active slide index in indexes array
                if (newIndicator === 0) {
                    indexes[ind] = amount - 1;
                } else {
                    indexes[ind] = newIndicator - 1;
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
        // Change index position in the active slides indexes array
        indexes[position] = indexes[position] - 1;
        if (indexes[position] === -1) {
            indexes[position] = amount - 1;
        }
        // Hidden element index
        var outerIndex = (indexes[position]) % amount;
        for (var i = 0; i < amount; i++) {
            // Change transforms values in array and visual styles
            var li = container.querySelectorAll('li')[i];
            li.style.transitionDuration = '1s';
            li.style.opacity = '1';
            li.style.transform = 'translate(' + (translatesArray[position][i] + containerWidth) + 'px)';
            translatesArray[position][i] = translatesArray[position][i] + containerWidth;
        }
        // Handle active bullet
        for (var k = 0; k < amount; k++) {
            container.querySelectorAll('span')[k].classList.remove('active');
        }
        container.querySelectorAll('span')[(indexes[position] + 1) % amount].classList.add('active');
        // Change hidden element position in dom and in translates array
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
        // Change index position in the active slides indexes array
        indexes[position] = indexes[position] + 1;
        // Hidden element index
        var outerIndex = (indexes[position] - 1) % amount;
        for (var i = 0; i < amount; i++) {
            // Change transforms values in array and visual styles
            var li = container.querySelectorAll('li')[i];
            li.style.transitionDuration = '1s';
            li.style.opacity = '1';
            li.style.transform = 'translate(' + (translatesArray[position][i] - containerWidth) + 'px)';
            translatesArray[position][i] = translatesArray[position][i] - containerWidth;
        }
        // Handle active bullet
        for (var k = 0; k < amount; k++) {
            container.querySelectorAll('span')[k].classList.remove('active');
        }
        container.querySelectorAll('span')[(indexes[position] + 1) % amount].classList.add('active');
        // Change hidden element position in dom and in translates array
        var outerLi = container.querySelectorAll('li')[outerIndex];
        outerLi.style.transform =
            'translate(' + (translatesArray[position][outerIndex] + containerWidth * amount) + 'px)';
        outerLi.style.opacity = '0';
        translatesArray[position][outerIndex] =
            translatesArray[position][outerIndex] + containerWidth * amount;
    }
}