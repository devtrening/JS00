// shopping_list.js
(function () {
    "use strict";

    var inpNewItem,
        btnAddNewItem,
        btnCleanList,
        divItemContainer,
        arrShoppingList = [];
    
    inpNewItem = document.getElementById('inpNewItem');
    btnAddNewItem = document.getElementById('btnAddNewItem');
    btnCleanList = document.getElementById('btnCleanList');
    divItemContainer = document.getElementById('divItemContainer');
    
    btnAddNewItem.addEventListener('click', function(){
        if (inpNewItem.value.trim() !== '') {
            var newItem = {
                caption : inpNewItem.value.trim(),
                checked : 0,
                divNewItem : {}
            };
            
            var position = arrShoppingList.length;
            arrShoppingList[position] = newItem;

            var divNewItem = document.createElement('div');
            divNewItem.setAttribute('class', 'alert');
            divNewItem.setAttribute('data-position', position);
            divNewItem.innerHTML = newItem.caption;
            
            arrShoppingList[position].divNewItem = divNewItem;
            
            var btnClose = document.createElement('button');
            btnClose.setAttribute('type', 'button');
            btnClose.setAttribute('class', 'close');
            btnClose.innerHTML = 'x';
            btnClose.addEventListener('click', function(){
                var position = this.parentNode.getAttribute('data-position');
                console.log(position);
                if (arrShoppingList[position].checked === 1){
                    arrShoppingList[position].checked = 0;
                    this.parentNode.setAttribute('class', 'alert');
                } else {
                    arrShoppingList[position].checked = 1;
                    this.parentNode.setAttribute('class', 'alert alert-error');
                }
      
                console.log(arrShoppingList);
            }, false);
            
            divNewItem.appendChild(btnClose);
            
            divItemContainer.appendChild(divNewItem);
            
            
            inpNewItem.value = '';
        } else {
            console.log('Please enter a value');
        }
    }, false);
    
    btnCleanList.addEventListener('click', function(){
        var i = arrShoppingList.length - 1;
        while (i >= 0){
            if (arrShoppingList[i].checked === 1){
                arrShoppingList[i].divNewItem.parentNode.removeChild(arrShoppingList[i].divNewItem);
                arrShoppingList.splice(i, 1);
                console.log(arrShoppingList);
            }
            i -= 1;
        }
    }, false);
}());