Vue.config.devtools = true;

Vue.component('game-block', {

    template: '<div v-show="value!=0" class="game-block" :style="blockStyle">{{ value }}</div>',
     
	props: ['index', 'value'],
    
    data: function(){
    	return {
        	blockTrans: 'add',
        };
    },
    
    computed: {
        row: function(){ return Math.floor(this.index / 4); },
        col: function(){ return this.index % 4; },
        blockStyle: function(){
        	var fontSize;
        	if(this.value > 1000){
            	fontSize = "32px";
            }
            else if(this.value > 100){
            	fontSize = "36px";
            }
            
        	return {
            	'left': this.col * 106 - 3 + 'px', 
                'top': this.row * 106 - 3 + 'px',
                'font-size': fontSize,
            };	
        },
    },
    
    methods: {
    },
    
    events: {
    	'new-block-enter': function(){
        	this.blockStyle.transition = "all 0.3 ease";
            console.log(this.$parent.blocks);
        },
    },
});


var vm = new Vue({
	el: "#game2048",
    data: {
    	blocks: [
        	0, 0, 0, 0, 
            0, 0, 0, 0,
        	0, 0, 0, 0, 
            0, 0, 0, 0,
        ],
        score: 0,
        status: "",
    },
    
    
    created: function(){
    	var blocks = this.blocks;
    	var self = this;
        
        blocks.findAllIndexByValue = function(val){
        	var index_of_val = [];
        	for(var i = 0; i < this.length; i += 1){
            	if(this[i] == val) index_of_val.push(i);
            }
            return index_of_val;
        }
        
        window.addEventListener('keyup', function(e){
        	switch(e.key){
            case 'ArrowRight': case 'ArrowLeft':
            case 'ArrowUp': case 'ArrowDown':
                self.$emit('player-move', e.key);
            default:
            }
        });
        
        var blocks = this.blocks;
        var init_index = _.sampleSize(_.range(16), 2);
        console.log(init_index);
        
        blocks[init_index[0]] = 2;
        blocks[init_index[1]] = 4;
        
        console.log("blocks:", this.blocks);
    },
    
    watch: {
    	'blocks': function(){
        	for(var i=0; i<=3; i++){
                console.log(this.blocks[i]);
            }
        },
    },
    
    methods: {
    	_genNewBlock: function(){
        	var blocks = this.blocks;
            var index_of_zeros = blocks.findAllIndexByValue(0);
            var select_index = _.sample(index_of_zeros);
            var rand_val = _.floor(_.random()+1.2)*2;
			
            this.$broadcast('new-block-enter');
            //console.log(index_of_zeros);
            //console.log("select=", index_of_zeros[select_index], "rand_val=", rand_val);
            blocks.$set(index_of_zeros[select_index], rand_val);
        },
        
        _addScore: function(scr){
        	this.score += scr;
        },
        
    	_oneRowMoveCalcu: function(arr){
        	var ne_index, ne_value;
            
            ne_index = (arr[3] != 0) ? 3 : 4 ;
            ne_value = (arr[3] != 0) ? arr[3] : 1 ;
        	
        	for(var i = 2; i >= 0; i -= 1){
            	if(arr[i] != 0){
                	if (ne_value == 1 || arr[i] != ne_value){
                        ne_value = arr[i];
                        ne_index -= 1;
                    	arr.$set(ne_index, arr[i]);
                        if( i != ne_index ) arr.$set(i, 0);
                    }
                    else{ /* Merge happened */
                    	this._addScore(arr[i]*2);
                        ne_value = 1; // For fitting 2048 merge rule
                 		arr.$set(ne_index, arr[i]*2);
                        arr.$set(i, 0);
                    }
                }
            }
            
            return arr;
        },
        
    	moveRight: function(){
        	var blocks = this.blocks;
            for(var i = 0; i <= 3; i += 1){
            	var row = blocks.slice(4*i, 4*(i+1));
            	row = this._oneRowMoveCalcu(row);
                for(var j = 0; j <= 3; j += 1){
                	blocks.$set(4*i+j, row[j]);
                }
            }
        },
        
        moveLeft: function(){
        	var blocks = this.blocks;
            for(var i = 0; i <= 3; i += 1){
            	var row = blocks.slice(4*i, 4*(i+1)).reverse();
            	row = this._oneRowMoveCalcu(row);
                for(var j = 0; j <= 3; j += 1){
                	blocks.$set(4*i+(3-j), row[j]);
                }
            }
        },
        
        moveUp: function(){
			var blocks = this.blocks;
            for(var i = 0; i <= 3; i += 1){
            	var row = [blocks[i+12], blocks[i+8], blocks[i+4], blocks[i]];
                row = this._oneRowMoveCalcu(row);
                for(var j = 0; j <= 3; j += 1){
                	blocks.$set(i+4*(3-j), row[j]);
                }
            }
        },
        
        moveDown: function(){
			var blocks = this.blocks;
            for(var i = 0; i <= 3; i += 1){
            	var row = [blocks[i], blocks[i+4], blocks[i+8], blocks[i+12]];
                row = this._oneRowMoveCalcu(row);
                for(var j = 0; j <= 3; j += 1){
                	blocks.$set(i+4*j, row[j]);
                }
            }
        },
    },
    
    events: {
    	'player-move': function(key){
        	switch(key){
            case 'ArrowRight':
                this.moveRight();
                break;
            case 'ArrowLeft':
            	this.moveLeft();
                break;
            case 'ArrowUp':
            	this.moveUp();
                break;
            case 'ArrowDown':
            	this.moveDown();
                break;
            default:
            }
            
            var blocks = this.blocks;
            
            if(blocks.includes(2048)){
				this.status = "You Win!!";
            }
            
            if(!blocks.includes(0)){
            }
            else{
            	this._genNewBlock();
            	if(0/* No more move */) {
                	alert("Game Over!!");
                }
            }
            
            //TODO: Game over check;
        },
    }
});


