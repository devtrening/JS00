// shopping_list.js
(function () {
    "use strict";
    
    // Simulation of constants
    var ON = 1,
        OFF = 2;

    var inpNewItem,
        btnAddNewItem,
        btnCleanList;
    
    inpNewItem = document.getElementById('inpNewItem');
    btnAddNewItem = document.getElementById('btnAddNewItem');
    btnCleanList = document.getElementById('btnCleanList');
    
    var Item = function(caption) {
        // Item title
        this.caption = caption;
        
        // Default checked state
        this.checked = OFF;

        // Item representation in DOM
        this.DOMElement = document.createElement('div');
        this.DOMElement.setAttribute('class', 'alert alert-success');
        this.DOMElement.innerHTML = caption;
        
        // onClick
        this.DOMElement.addEventListener('click', function() {
            this.changeState();
        }.bind(this), false);
        
        // method that changes checked ON/OFF and DOM appearance
        this.changeState = function () {
            if (this.checked === OFF) {
                this.DOMElement.setAttribute('class', 'alert alert-danger');
                this.checked = ON;
            } else {
                this.DOMElement.setAttribute('class', 'alert alert-success');
                this.checked = OFF;
            }
        };
        
        return this;
    };
    
    var objItemList = {
        container : document.getElementById('divItemContainer'),
        list : [],
        purge : [],
        
        addItem : function(caption) {
            var item = new Item(caption);
            this.list.push(item);
            this.container.appendChild(item.DOMElement);
        },
        
        removeItem : function(item) {
            item.DOMElement.parentNode.removeChild(item.DOMElement);
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
            inpNewItem.focus();
        } else {
            console.log('Please enter a value');
        }
    }, false);
    
    btnCleanList.addEventListener('click', function() {
        objItemList.purgeItems();
    }, false);
}());