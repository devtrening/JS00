// shopping_list.js
(function () {
    "use strict";
    
    // Simulation of constants
    var ON = 1,
        OFF = 2;
	//DOM appearance konstante
	var checkState = ['','alert alert-danger','alert alert-success'];
    var inpNewItem,
        btnAddNewItem,
        btnCleanList,
		btnUndo;
    
    inpNewItem = document.getElementById('inpNewItem');
    btnAddNewItem = document.getElementById('btnAddNewItem');
    btnCleanList = document.getElementById('btnCleanList');
	btnUndo = document.getElementById('btnUndo');
    
	var TUndo = function(){
		this.list = [];		
		
		var Tadd = function(item){
			//item koje treba restorat
			this.aitem =item;
			//zavisi dali je item dodan ili obrisan, promjena stanja se ne pamti.
			this.restore =function(){}
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
			if(this.list.length == 0){
				btnUndo.setAttribute('disabled','disabled' );
			} else{
				btnUndo.removeAttribute('disabled');
			}
		};
		
	}
	
	var LStorage = function (name){
		this.key = name;
		
		this.save = function(list) {
			if (this.canUse){
				var value = JSON.stringify(list, function(key, value) {
							if (key === 'DOMElement') {  //ako ga ne zaobidjem izaziva circular reference, ionak nemora biti spremljen
								return 'null'; 
							} else {
								return value; 
							} } );
				localStorage.setItem(this.key, value);
			}
		}
		
		this.read = function(){	
			if (this.canUse){
				var items = localStorage.getItem(this.key);
				if (items !== null){
					return JSON.parse(items);
				}
			};
			return [];
		}
		
		if (window.localStorage) {
			this.canUse = true;
			console.log('localStorage available!');
		} else {
			this.canUse = false;
			console.log('Fallback to using cookies!');
		}
	}
	
	//chk je default vrijednost, dodao sam zato da mogu jednostavno kreirati i kliknute kod čitanja iz localStorage-a
    var Item = function(caption,chk) {
        // Item title
        this.caption = caption;
        
        // Default checked state
		if(chk === undefined){chk = OFF};		
        this.checked = chk;
		//Onclick callBack
		this.callBack = function(){};
        // Item representation in DOM
        this.DOMElement = document.createElement('div');
		// u ovom trenutku this.setClass(); još ne postoji, hm, hm. 
        //this.setClass();
        this.DOMElement.innerHTML = caption;
        
        // onClick
        this.DOMElement.addEventListener('click', function() {            
			this.changeState();	
			// više mi se svidja koristit parent ali onda i parent izaziva circular reference u JSON.stringify
			this.callBack();
        }.bind(this), false);
        
        // method that changes checked ON/OFF 
        this.changeState = function () {
            if (this.checked === OFF) {                
                this.checked = ON;
            } else {                
                this.checked = OFF;
            }
			this.setClass();
        };
		
		// set DOM appearance
        this.setClass = function(){
			this.DOMElement.setAttribute('class', checkState[this.checked]);
		};
		
		//set default DOM appearance
		this.setClass();
        return this;
    };
    
    var objItemList = {
        container : document.getElementById('divItemContainer'),
        list : [],
        purge : [],
		myStorage : new LStorage('ShoppingList'),
		undo : new TUndo(),
        		
        addItem : function(caption,chk) {
            var item = new Item(caption,chk);			
			// spremanje promjena nakon item.changeState
			item.callBack = function(){this.save()}.bind(this);
            this.list.push(item);
            this.container.appendChild(item.DOMElement);			
			this.save();			
			return item;
			//this.undo.Add(item,this.undoRemove.bind(this));
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
			this.save();
        },
		// item je bio dodan, undo ga mora obrisat
		undoRemove : function(item){			
			for (var i = 0; i < this.list.length; i += 1) {
                if (this.list[i] === item) {
                    this.removeItem(this.list[i]);
                    this.list.splice(i,1);                    
                }
            }
			this.save();
		},
		
		// item je bio obrisan, undo ga mora vratit
		undoAdd : function (item){
			this.list.push(item);
            this.container.appendChild(item.DOMElement);						
			this.save();			
		},
		// klik na undo tipku
		doUndo : function (){
			this.undo.restore();			
		},
		
		
		load : function (){
			var tmp = this.myStorage.read();
			if (tmp.length>0){
				for(var i=0; i<tmp.length; i+=1){
					this.addItem(tmp[i].caption,tmp[i].checked);					
				}
			}
		},
		save : function (){
			this.myStorage.save(this.list);
		}
    };
	
	// procitaj ako ima nešto zpisano
    objItemList.load();
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
	btnUndo.addEventListener('click', function() {
        objItemList.doUndo();
    }, false);
}());