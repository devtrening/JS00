var random= function(){
	var tmp,rnd;
	for(var i=0,max=this.length; i<max; i+=1){
		rnd = Math.floor((Math.random()*max));
		tmp = this[i];
		this[i]=this[rnd];
		this[rnd] = tmp;
	}
};
a = new Array();
a.push(4,5,6,3,2,1,7,6,55,6,65,12,21,34);
console.log("novi: ",a);
document.write(a+"<br>");
a.sort(function(c,b){return c-b});
document.write(a+"<br>");
console.log("sortirani: ", a);
a.random = random;
a.random();
document.write(a+"<br>");
console.log("random: ", a);