// lesson_5.js
(function () {
    "use strict";


    var btn_say = document.getElementById('btn_say'),
        div_messages = document.getElementById('messages'),
        inp_element = document.getElementById('inp_element'),
        p_log = document.getElementById('log'),
        conn = new WebSocket('ws://localhost:8000');

    conn.onmessage = function (e) {
        publish(e.data, "alert-block");
        log(e.data);
    };

    conn.onopen = function () {
        publish('Connection open.', "alert-success");
    };

    conn.onclose = function () {
        publish('Connection lost.', 'alert-error');
    };

    var publish = function (text, type) {
        var new_element = document.createElement("div");
        new_element.setAttribute("class", "alert" + " " + type);
        new_element.innerHTML = text;
        div_messages.appendChild(new_element);
        setTimeout(function () {
            new_element.parentNode.removeChild(new_element);
        }, 5000);
    };

    var log = function (text) {
        var time = new Date();
        p_log.innerHTML += time.getHours() + ":" + time.getMinutes() + " " + text;        
        var new_element = document.createElement('br');
        p_log.appendChild(new_element);
    };

    var say = function () {
        conn.send(inp_element.value);
        publish(inp_element.value, "alert-info");
        log(inp_element.value);
        inp_element.value = '';
    };

    var enter = function(event) {
        if (event.charCode === 13) {
            say();
        }
    };

    btn_say.addEventListener('click', say, false);
    inp_element.addEventListener('keypress', enter, false);

}());