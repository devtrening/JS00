// shopping_list.js
(function () {
    "use strict";
	var InpNewItem = document.getElementById('InpNewItem'),
		BtnAddNewItem = document.getElementById('BtnAddNewItem'),
		ItemContainer = document.getElementById('ItemContainer'),
		BtnClear = document.getElementById('BtnClear'),
		arrShoppingList = [];
				
	var BtnAddNewItemOnClick = function() {
		if(InpNewItem.value.trim()){
			var newItem = {
				caption :InpNewItem.value.trim(),
				checked :0,
				domitem: null
			}
			arrShoppingList.push(newItem);
			newItem.domitem=AddItemToContainer(newItem);
			InpNewItem.value = '';
			console.log(arrShoppingList);
		} else {
			console.log('Please enter value');
		}
	}
	
	var AddItemToContainer = function (value) {
		var item = document.createElement('div');
			item.setAttribute('class','alert');
			//item.setAttribute('data-position',arrShoppingList.length-1);
			item.innerHTML=value.caption;
			item.moj= value;		
		var btn_close = document.createElement('button');
			btn_close.setAttribute('type','button');
			btn_close.setAttribute('class','close');
			btn_close.innerHTML='x';
			btn_close.addEventListener('click', function(){
				this.parentNode.setAttribute('class','alert alert-error');
				this.parentNode.moj.checked=1;
				console.log(arrShoppingList);
				//var position = this.parentNode.getAttribute('data-position');
				//	arrShoppingList[position].checked=1;
			}, false);
			item.appendChild(btn_close);
			ItemContainer.appendChild(item);
		return item;
	}
	
	BtnAddNewItem.addEventListener('click', BtnAddNewItemOnClick, false);
	BtnClear.addEventListener('click', function(){
		for(var i=arrShoppingList.length-1; i>=0; i-=1){
			arrShoppingList[i].domitem.parentNode.removeChild(arrShoppingList[i].domitem);
			arrShoppingList.splice(i,1);
			console.log(i);
		}
		}, false);
}());