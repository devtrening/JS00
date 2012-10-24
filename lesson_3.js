// lesson_3.js

a= [5,1,10,15,0,99];

/*a.random = function(){	
	//return Math.round(Math.random() *10);
	
	var i=0,
		max = this.length,
		tmp= 0;
		
	for(i; i<max; i+=1){
		tmp = this[i];
		
		console.log(this[i]);
	}
	return this;	//vraæa sami array nazad
}; neuspjeli pokušaj za uspoemnu i dugo sjeæanje*/

a.random = function(){
	this.sort(function(){
		return Math.sin(Math.PI * Math.random() * 2);  //vraæa vrijednosti izmeðu -1 i 1, ako je negativno funkcija sort mijenja mjesta i suprotno
	});

};



a.random2 = function(){
	"use strict";
	var i,
		original = this,
		index;
	for(i = 0; i<this.length; i++){
		index = Math.round((original.length - 1) *Math.random());
		this[i] = original.splice(index,1)[0];
	}
	
	return this;
}