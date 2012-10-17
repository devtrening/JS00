// lesson_2.js

// instanciranje object()
var person = new Object();
person.name = "Marko";
person.age = 29;
person.sex = 'M';
person.getAge = function () {
    return this.age;
};


// skraceno, preko object literal
var pet = {
    "name" : "Fido",
    "age" : 7,
    42 : "odgovor",
    getAge : function () {
        return this.age;
    }
};

// kombinacija stilova koja se ne preporuca
var car = {};
car.model = "Punto";
car.year = 2010;

// polja
// instanciranje objekta Array()
//var colors = new Array();
//var colors = new Array(5);
//var colors = new Array("5");
var colors = new Array("red", "green", "blue");

// array literal notation
//var days = [];
var days = ["pon", "uto", "sri", "cet"];

days.length = 2;
days[days.length] = "pet";


var testVar = function ( unknownVar ) {
    if (Array.isArray(unknownVar)) {
        return "Polje";
    } else {
        return "Nesto drugo ;-)";
    }
};

//days.toString = function () {
//    return "He, he, he";
//};

var sviDaniUTjednu = days.join(";");

//document.write(days.join('\n'));


// stack
var n = colors.push("orange", "lime"); // returns 2
var lastItem = colors.pop();

// "queue"
var firstItem = colors.shift();
n = colors.unshift("orange", "lime"); // returns 2


var numValues = [0, 1, 5, 10, 15];

numValues.reverse();

// nesto sasvim neocekivano
//numValues.sort();

compare = function (value1, value2) {
    if (value1 < value2) {
        return -1;
    } else if (value1 > value2) {
        return 1;
    } else {
        return 0;
    }
};

numValues.sort(compare);

// petlje
function looper() {
    var i = 0,
        max = days.length;
        
    for (i = 0; i < max; i++) {
        console.log(days[i]);
    }
    
}

for (i = days.length; i--; ) {
    console.log(i + ' -> ' + days[i]);
}

i = colors.length;
while ( i -= 1 ) {
    console.log(i + ' -> ' + colors[i]);
}


for ( var property in person ) {
    
    if ( person.hasOwnProperty(property) ) {
        console.log( property + ' -> ' + person[property] );
    }
    
}

for ( var i in colors ) {
    console.log( i + ' -> ' + colors[i] );
}



























