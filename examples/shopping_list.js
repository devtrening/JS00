// shopping_list.js
(function () {
    "use strict";
	
	var inpNewItem,
		btnAddNewItem,
		divItemContainer,
		arrShoppingList = [];
	
	inpNewItem = document.getElementById('inpNewItem');
	btnAddNewItem = document.getElementById('btnAddItem');
	divItemContainer = document.getElementById('divItemContainer')
	
	btnAddNewItem.addEventListener('click', function(){
	console.log('blabla');
		if(inpNewItem.value.trim !== ''){
			var newItem  = {
				caption : inpNewItem.value.trim(),
				checked :0
			};
			
			var position = arrShoppingList.lenght;
			arrShoppingList[position] = newItem;
		
		var divNewItem = document.createElement('div');
		divNewItem.setAttribute('class', 'alert');
		divNewItem.setAttribute('data-position', 'position');
		divNewItem.innerHTML = newItem.caption;
		
		var btnClose = document.createElement('button');
		btnClose.setAttribute('type', 'button');
		btnClose.setAttribute('class', 'close');
		btnClose.innerHTML = 'X';
		btnClose.addEventListener('click', function () {
			this.parentNode.setAttribute('class', 'alert alert-error');
			
			var position = this.parentNode.getAttribute('data-position');
			if ( arrShoppingList[position].checked === 1){
				 arrShoppingList[position].checked = 0;
			} else {
				arrShoppingList[position].checked = 1;
				this.parentNode.setAttribute('class', 'alert alert-error');
			}
			console.log(this.parentNode);
		},false);
		
		divNewItem.appendChild(btnClose);
			
		divItemContainer.appendChild(divNewItem);
		
		inpNewItem.value = '';
		} else {
		console.log('Please enter avalue!');
		}
	},false);
	
	btnCleanList.addEventListener('click', function(){
		var i = arrShoppingList.length;
		while (i>1){
			if ( arrShoppingList[i].checked === 1) {
				arrShoppingList[i].divNewItem.parentNode.removeChild(arrShopingList[i].divNewItem);
				i--;
			}
		}
	},false);
	
}());