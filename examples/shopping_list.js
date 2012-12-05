// shopping_list.js
(function () {
    g;
	var inpNewItem,
	btnAddNewItem,
	arrShopingList[];
	
	var position = arrShoppingList.length;
	arrShoppingList[position] =newItem;
	
	inpNewItem = document.getElementById("inpNewItem");
	btnAddNewItem = document.getElementById("btnAddNewItem");
	
	btnAddNewItem.addEventListener("click", function(){
		if (inpNewItem.value.trim() !== "") {
		arrShoppingList.push(inpNewItem.value.trim());
		
		var divNewItem = document.createElement("div");
		divNewItem.setAtribute ("class","alert");
		divNewItem.innerHTML = inpNewItem.value.trim();
		
		btnClose.setAtribute ("class","close");
	
		
		console:log("Zabilježeno")}
		), false);
}());