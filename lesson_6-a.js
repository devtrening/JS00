// lesson_6-a.js
(function () {
    "use strict";

    if (window.sessionStorage) {
        console.log('sessionStorage available!');
    } else {
        console.log('Fallback to using cookies!');
    }
       
    var user = sessionStorage.getItem('user');
    user = JSON.parse(user);
    
    // sto ako nam ne trebaju svi podaci?
    var userPart = JSON.stringify(user, ['username', 'email']);
    
    // sto ako je potrebno manipulirati podacima?
    userPart = JSON.stringify(user, function(key, value) {
        if (key === 'luckyNumbers') {
            return [13];
        } else {
            return value; // uvijek treba pokriti defaultnu vrijednost
        } 
    });
    
    // modificiranje izgleda
    userPart = JSON.stringify(user, null, '-');
    
    // kada vlasnik objekta zeli definirati kako se pretvara u string
    user.toJSON = function() {
        this.email = this.email.replace(/\w/g, '*');
        return this;
    };
    
    userPart = JSON.stringify(user);
    
    // parsing
    user = JSON.parse(userPart, function(key, value) {
        if (key === 'luckyNumbers') {
            var luckyNumbers = [];
            for (var i = 0; i < 7; i += 1) {
                luckyNumbers[i] = Math.round(Math.random() * 100);
            }
            return luckyNumbers;
        } else {
            return value;
        }
    });
    
    console.log(user);
    
}());