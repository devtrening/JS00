// countdown.js
(function () {
    "use strict";

    var countdown = document.getElementById('countdown');

    var displayNum = function (num) {
        num = num.toString();
        if ( num.length === 1) {
            return '0' + num.toString();
        } else {
            return num;
        }
    };
    
    var calculateTime = function (count) {
        var hr = Math.floor(count/3600),
            min = Math.floor((count - hr * 3600) / 60),
            sec = count - hr * 3600 - min * 60;

        return displayNum(hr) + ':' + displayNum(min) + ':' + displayNum(sec);
    };
    

    var displayTime = function () {
        var count = countdown.getAttribute('data-count');
        if (count >= 0) {
            countdown.innerHTML = calculateTime(count);
        } else {
            clearInterval(subtract_interval);
            clearInterval(displayTime_interval);
        }
    };

    var subtract = function () {
        countdown.setAttribute('data-count', countdown.getAttribute('data-count') - 1);
    };

    var subtract_interval = setInterval(subtract, 2);
    var displayTime_interval = setInterval(displayTime, 6   );

    //displayTime();
    //console.log(hr, min, displayNum(sec));
}());