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
    
	var WordsList = {
		list : [],
		
		addWord : function (word){
			if (!this.isInList(word.toUpperCase())){
				this.list.push(word);				
				this.save();
				//this.update();				
			}
		},
		
		isInList : function (word){
			for(var i = 0, l = this.list.length; i < l; i++) {
				if(this.list[i].toUpperCase() == word) {
					return true;
				}
			}
			return false;			
		},
		
		save : function () {
			localStorage.setItem('WordsList', JSON.stringify(this.list));
		},
		
		load : function () {
			var tmp = JSON.parse(localStorage.getItem('WordsList'));
			if (tmp !== null){
				this.list = tmp;
				//this.update();
			};			
		},
		//update više netreba, typeahead je aktiviran dolje i koristi source funkciju
		/*update : function () {
			inpNewItem.setAttribute('data-provide', 'typeahead');
			inpNewItem.setAttribute('data-items', '5');
			inpNewItem.setAttribute('data-source', JSON.stringify(this.list));
		},*/
		getEditDistance : function (a, b){
			if(a.length == 0) return b.length; 
			if(b.length == 0) return a.length; 
			var matrix = [];
			// increment along the first column of each row
			var i;
			for(i = 0; i <= b.length; i++){
				matrix[i] = [i];
			} 
			// increment each column in the first row
			var j;
			for(j = 0; j <= a.length; j++){
				matrix[0][j] = j;
			}
			// Fill in the rest of the matrix
			for(i = 1; i <= b.length; i++){
				for(j = 1; j <= a.length; j++){
					if(b.charAt(i-1) == a.charAt(j-1)){
						matrix[i][j] = matrix[i-1][j-1];
					} else {
						matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
						Math.min(matrix[i][j-1] + 1, // insertion
						matrix[i-1][j] + 1)); // deletion
					}
				}
			} 
			return matrix[b.length][a.length];
		}
		
	}
	
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
			WordsList.addWord(inpNewItem.value.trim());
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
    
    inpNewItem.addEventListener('keydown', function(keyEvent) {
        if (keyEvent.keyCode === 13) {
            if (inpNewItem.value.trim() !== '') {
                var item = objItemList.addItem(inpNewItem.value.trim());
                // necu da undo radi na ucitavanje
                objItemList.undo.Add(item,objItemList.undoRemove.bind(objItemList));
                WordsList.addWord(inpNewItem.value.trim());
                inpNewItem.value = '';
                inpNewItem.focus();
            } else {
                console.log('Please enter a value');
            }
        }
    }, false);
    
    // window.setInterval(objStorage.localSaveList(objItemList.list), 1000);
    
    // Fill list from localStorage
    var localList = objStorage.localLoadList();
    for (var i = 0; i < localList.length; i += 1) {
        objItemList.addItem(localList[i].caption);
    }
    WordsList.load();
	
	// neznam kak drugačije uglavit typeahead , rado bi ga strpao u WordsList al bi onda vjerojatno imao problema sa "this"
	$("#inpNewItem").typeahead({
        minLength: 3,
        source: function(query, process) {	
			console.log(WordsList.list);
			return WordsList.list;
        },
		matcher : function(item){
			// originalna funkcija
			var result= ~item.toLowerCase().indexOf(this.query.toLowerCase());			
			if (!result){
				// edit distance
				result = WordsList.getEditDistance(item,this.query)<4;
			};
			return  result;			
		}
    });
}());