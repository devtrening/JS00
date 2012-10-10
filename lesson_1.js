var answer = 42;
console.log(answer);

// kako je JS loosly typed
//answer = 'to universe...';

// varijable mozemo deklarirati i bez inicijalizacije
var question;
console.log(question);

// razlika između globalnih i lokalnih varijabli
// prilikom deklaracije var ograničava scope varijable na lokalni scope

function sayHi() {
    var message = 'Hello!';
}

function sayHiToAll() {
    message = 'Hello to All!';
}

sayHiToAll();
console.log(message);

// tipovi podataka
// typeof operator
// @TODO Nadopuniti sa svim tipovima podataka
console.log(typeof message);
console.log(typeof answer);
console.log(typeof question);


function hi() {
    // Singe var pattern
    var message,
        a, 
        b;
    
    message = 'Hi';
    
    a = b = 0;
    
    console.log(a, b);
    
}


var global_var = 1;
global_novar = 2;

(function () {
    global_fromfunc = 3;
}());




