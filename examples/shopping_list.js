// shopping_list.js
(function () {
    "use strict";

    var inpNewItem,
        btnAddNewItem,
        btnCleanList;
    
    inpNewItem = document.getElementById('inpNewItem');
    btnAddNewItem = document.getElementById('btnAddNewItem');
    btnCleanList = document.getElementById('btnCleanList');
    
    var Item = function(caption) {
        this.caption = caption;
        this.checked = 0;
        this.divItem = document.createElement('div');
        this.divItem.setAttribute('class', 'alert alert-success');
        this.divItem.innerHTML = caption;
        this.divItem.obj = this;
        this.divItem.addEventListener('click', function() {
            if (this.obj.checked === 0) {
                this.setAttribute('class', 'alert alert-danger');
                this.obj.checked = 1;
            } else {
                this.setAttribute('class', 'alert alert-success');
                this.obj.checked = 0;
            }
        }, false);
        return this;
    };
    
    var objItemList = {
        container : document.getElementById('divItemContainer'),
        list : [],
        
        addItem : function(caption) {
            var objItem = new Item(caption);
            this.list.push(objItem);
            this.container.appendChild(objItem.divItem);
        },
        
        removeItem : function(item) {
            item.divItem.parentNode.removeChild(item.divItem);
        },
        
        purgeItems : function() {
            for (var i = 0; i < this.list.length; i += 1) {
                if (this.list[i].checked === 1) {
                    this.removeItem(this.list[i]);
                    this.list.splice(i,1);
                    i -= 1;
                }
            }
        }
    };
    
    btnAddNewItem.addEventListener('click', function(){
        if (inpNewItem.value.trim() !== '') {
            objItemList.addItem(inpNewItem.value.trim());
            inpNewItem.value = '';
        } else {
            console.log('Please enter a value');
        }
    }, false);
    
    btnCleanList.addEventListener('click', function() {
        objItemList.purgeItems();
    }, false);
}());