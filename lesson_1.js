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
    message = 'Hello!';
}

sayHiToAll();
console.log(message);

// tipovi podataka
// typeof operator
// @TODO Nadopuniti sa svim tipovima podataka
console.log(typeof message);
console.log(typeof answer);
console.log(typeof question);


