// lesson_2_sorting.js

var arr_people = [
    {
        name : "Marko",
        age : 27
    },
    {
        name : "Ivan",
        age : 19
    },
    {
        name : "Martina",
        age : 22
    },
    {
        name : "Saša",
        age : 36
    },
    {
        name : "Paula",
        age : 21
    }
];

arr_people.printAll = function () {
    "use strict";
    var i,
        max = this.length;

    for (i = 0; i < max; i += 1) {
        console.log(this[i].name + '(' + this[i].age + ')');
    }
};

var deva = {
    compareByName : function (a, b) {
        "use strict";
        if (a.name < b.name) {
            return -1;
        } else if (a.name > b.name) {
            return 1;
        } else {
            return 0;
        }
    },
    compareByAge : function (a, b) {
        "use strict";
        return a.age - b.age;
    }
};

/*
 * Isprobajte...
 */
//arr_people.printAll();
//arr_people.sort();
//arr_people.printAll(); // no change
//arr_people.sort(deva.compareByName);
//arr_people.printAll(); // sorted by name
//arr_people.sort(deva.compareByAge);
//arr_people.printAll(); // sorted by age
