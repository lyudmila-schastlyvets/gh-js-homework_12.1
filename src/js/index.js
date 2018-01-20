import '../sass/style.scss'

var index = 0;
var amount = 0;
var currTransl = [];
var translationComplete = true;


var transitionCompleted = function() {
    translationComplete = true;
};

document.addEventListener('DOMContentLoaded', function(event) {
    var container = document.getElementById('slider-1');
    var containerWidth = container.clientWidth;
    amount = container.querySelectorAll('li').length;
    for (var i = 0; i < amount; i++) {
        currTransl[i] = -containerWidth;
        container.querySelectorAll('li')[i].addEventListener('transitionend', transitionCompleted, true);
        container.querySelectorAll('li')[i].addEventListener('webkitTransitionEnd', transitionCompleted, true);
        container.querySelectorAll('li')[i].addEventListener('oTransitionEnd', transitionCompleted, true);
        container.querySelectorAll('li')[i].addEventListener('MSTransitionEnd', transitionCompleted, true);
    }

    document.getElementById('slider-1').addEventListener('click', function (event) {
        if (event.offsetX > 200) {
            right();
        } else {
            left();
        }
    });

});

function right() {
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

function left() {
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
