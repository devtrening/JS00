// shopping_list.js
(function () {
    "use strict";
	
	var 	inpNewItem,
			btnAddNewItem,
			arrShoppingList = [];
	
	inpNewItem = document.getElementById('inpNewItem');
	btnAddNewItem = document.getElementById('btnAddNewItem');
	btnAddNewItem.addEventListener ('click', function(){
		if(inpNewItem.value !== ''){
			
			var newItem = {
				caption: inpNewItem.value.trim(),
				checked: 0;
				divNewItem: {}
			},
			position = arrShoppingList.length;
			arrShoppingList.[position] = newItem;
			
			var divNewItem = document.createElement('div');
			divNewItem.setAttribute('class', 'alert');			
			divNewItem.setAttribute('data-position', 'position');
			divNewItem.innerHTML = newItem.caption;
			
			var btnClose = document.createElement('button');
			btnClose.setAttribute('type', 'button');
			btnClose.setAttribute('class', 'close');
			btnClose.innerHTML = 'x';
			btnClose.addEventListener('click', function(){
				this.parentNode.setAttribute('class', 'alert alert-error');
				var position =this.parentNode.getAttribute('data-position');
				if (arrShoppingList[position].checked === 1){
					arrShoppingList[position].checked ==  0;
				}
			}, false)
			
			divNewItem.appendChild(btnClose);
			
			divItemContainer.appendChild(divNewItem);
			
			console.log(inpNewItem.value);
			
			inpNewItem.value ='';
		}
		else{
			console.log('Please enter a new value');
		}
	}, false);


	
}());

