// lesson_3.js

a = [5,7,17,45,11,0,6];

a.random =function() {
	
	var i = 0,
	    max = this.length;
		
		for (i; i<max; i+=1) {
			console.log(this[i])};
	
	return this;

}