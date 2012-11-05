// lesson_4.js
(function () {
    "use strict";

    var btn_add = document.getElementById('btn_add'),
        btn_show = document.getElementById('btn_show'),
        btn_all_elements = document.getElementById('all_elements'),
        inp_element = document.getElementById('inp_element'),
        messages = document.getElementById('messages'),
        all_elements = [];

    var adder = function (element) {
        console.log('Adder:', element);
        all_elements.push(element);
        return all_elements;
    };

//    var adder = function (element, target_array) {
//        console.log('Adder:', element);
//        target_array.push(element);
//        return target_array;
//    };
//
    var button_adder = function (element, target) {
        var new_element = document.createElement("button");
        new_element.setAttribute("class", "btn");
        new_element.setAttribute("id", "btn" + all_elements.length);
        new_element.innerHTML = element;
        new_element.addEventListener("click", function () {
            this.parentNode.removeChild(this);
            //console.log(this);
        }, false);
        target.appendChild(new_element);
    };

    var alert_adder = function (message, target) {
        var new_element = document.createElement("div");
        new_element.setAttribute("class", "alert alert-info");
        new_element.innerHTML = message;
        target.appendChild(new_element);
        setTimeout(function (){
            new_element.parentNode.removeChild(new_element);
        }, 5000);
    };

    var eventer = function () {
        console.log('Eventer:');
        adder(inp_element.value, all_elements);
        button_adder(inp_element.value, btn_all_elements);
        alert_adder('Added "' + inp_element.value + '" to array!', messages);
        inp_element.value = '';
    };

    var logger = function () {
        console.log('Logger:', all_elements);
    };

    btn_add.addEventListener('click', eventer, false);
    btn_show.addEventListener('click', logger, false);

    setTimeout(function () {
        var alert_info_start = document.getElementById('alert-info-start');
        alert_info_start.parentNode.removeChild(alert_info_start);
    }, 3000);
}());