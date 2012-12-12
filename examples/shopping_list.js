// shopping_list.js
(function () {
    "use strict";
    
    // Simulation of constants
    var ON = 1,
        OFF = 0;

    var inpNewItem,
        btnAddNewItem,
        btnCleanList,
        btnSaveList,
		btnUndo;
    
    inpNewItem = document.getElementById('inpNewItem');
    btnAddNewItem = document.getElementById('btnAddNewItem');
    btnCleanList = document.getElementById('btnCleanList');
    btnSaveList = document.getElementById('btnSaveList');
    btnUndo = document.getElementById('btnUndo');
    
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
        
        this.toJSON = function() {
            var returnedProperties = {
                'caption' : this.caption,
                'checked' : this.checked
            };
            return returnedProperties;
        };
        
        return this;
    };

	var TUndo = function(){
		this.list = [];		
		
		var Tadd = function(item){
			//item koje treba restorat
			this.aitem =item;
			//zavisi dali je item dodan ili obrisan, promjena stanja se ne pamti.
			this.restore =function(){};
		};

        this.Add = function(item,restore){
			var newitem = new Tadd(item);
			this.list.push(newitem);
			newitem.restore = restore;
			this.setButton();
		};
		
		this.restore = function (){
			var last = this.list.pop();
			if(last){
				this.setButton();
				last.restore(last.aitem);			
			}
		};
		
		// Undo button update
		this.setButton = function (){			
			if(this.list.length === 0){
                btnUndo.setAttribute('disabled','disabled' );
			} else{
				btnUndo.removeAttribute('disabled');
			}
		};
		
	};
	
    
    var objItemList = {
        container : document.getElementById('divItemContainer'),
        list : [],
        purge : [],
		undo : new TUndo(),
        
        addItem : function(caption) {
            var item = new Item(caption);
            this.list.push(item);
            this.container.appendChild(item.DOMElement);
			return item;
        },
        
        removeItem : function(item) {
            item.DOMElement.parentNode.removeChild(item.DOMElement);
        },
        
        purgeItems : function() {
            for (var i = 0; i < this.list.length; i += 1) {
                if (this.list[i].checked === 1) {
					this.undo.Add(this.list[i],this.undoAdd.bind(this));
                    this.removeItem(this.list[i]);
                    this.list.splice(i,1);
                    i -= 1;
                }
            }
        },

		// item je bio dodan, undo ga mora obrisat
		undoRemove : function(item){			
			for (var i = 0; i < this.list.length; i += 1) {
                if (this.list[i] === item) {
                    this.removeItem(this.list[i]);
                    this.list.splice(i,1);                    
                }
            }
		},
		
		// item je bio obrisan, undo ga mora vratit
		undoAdd : function (item){
			this.list.push(item);
            this.container.appendChild(item.DOMElement);						
		},
		// klik na undo tipku
		doUndo : function (){
			this.undo.restore();			
		}

    };
    
    var objStorage = {
        localSaveList : function(list) {
            localStorage.setItem('list', JSON.stringify(list));
            alert('Saved');
        },
        
        localLoadList : function() {
            return JSON.parse(localStorage.getItem('list'));
        }
    };
    
    btnAddNewItem.addEventListener('click', function(){
        if (inpNewItem.value.trim() !== '') {
            var item = objItemList.addItem(inpNewItem.value.trim());
			// neču da undo radi na učitavanje
			objItemList.undo.Add(item,objItemList.undoRemove.bind(objItemList));
            inpNewItem.value = '';
            inpNewItem.focus();
        } else {
            console.log('Please enter a value');
        }
    }, false);
    
    btnCleanList.addEventListener('click', function() {
        objItemList.purgeItems();
    }, false);
    
    btnSaveList.addEventListener('click', function() {
        objStorage.localSaveList(this.list);
    }.bind(objItemList), false);

	btnUndo.addEventListener('click', function() {
        objItemList.doUndo();
    }, false);
    
    // window.setInterval(objStorage.localSaveList(objItemList.list), 1000);
    
    // Fill list from localStorage
    var localList = objStorage.localLoadList();
    for (var i = 0; i < localList.length; i += 1) {
        objItemList.addItem(localList[i].caption);
    }
    
}());