// lesson_3.js
// zadatak s predavanja
var a = [5, 1, 10, 15, 0, 99];

// prvi primjer random funkcije
a.random = function () {
    "use strict";
    this.sort(function () {
        return Math.sin(Math.PI * Math.random() * 2);
    });
    return this;
};

// drugi primjer random funkcije uz ponavljanje slice() i splice()
a.random = function () {
    "use strict";
    var i,
        original = this.slice(0), // ovo radi kopiju arraya
        index;

    for (i = 0; i < this.length; i += 1) {
        index = Math.round((original.length - 1) * Math.random());
        this[i] = original.splice(index, 1)[0];
    }

    return this;
};