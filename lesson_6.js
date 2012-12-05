// lesson_6.js
(function () {
    "use strict";

    if (window.sessionStorage) {
        console.log('sessionStorage available!');
    } else {
        console.log('Fallback to using cookies!');
    }
    
    document.addEventListener('storage', function(event) {
        alert('storage');
    });

    // store a value
    sessionStorage.setItem('user', 'lmuzinic');
    sessionStorage.setItem('email', 'luka@muzinic.net');

    // get a value
    var user = sessionStorage.getItem('user');

    // get a value by position
    var email_key = sessionStorage.key(0);
    
    console.log(user, email_key);
    
    // remove all
    sessionStorage.clear();
    
    console.log(
        sessionStorage.getItem('email')
    ); // should be null
        
    user = {
        username : 'lmuzinic',
        email : 'luka@muzinic.net',
        'luckyNumbers' : [5, 8, 77, 122]
    };
    
    // what now Batman? Zasto je vrijednost identicna user.toString();?
    sessionStorage.setItem('user', user);
    
    sessionStorage.setItem('user', JSON.stringify(user));
    
}());