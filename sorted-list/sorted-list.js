var vm = new Vue({
	el: "#example",
    data: {
    	contents: ['Stephen Curry', 'LeBron James', 'Kevin Durant', 
        		   'Kobe Bryant', 'Tim Duncan', 'Chris Paul'],
        dragIndex: 0,
        mode: "Sorted",
    },
    methods: {
    	_swapItem(arr, index1, index2){
        	var tmp = arr[index1];
            arr[index1] = arr[index2];
            arr.$set(index2, tmp);
        },
        
    	onDragstart: function(index){
            this.dragIndex = index;
        },
        
        onDragover: function(dragoverIndex){
        	if(this.mode == "Sorted"){
                this._swapItem(this.contents, this.dragIndex, dragoverIndex);
                this.dragIndex = dragoverIndex;
            }
        },
        
        onDragend: function(){
        },
        
        onDrop: function(dropIndex){
        	if(this.mode == 'Swap'){
                this._swapItem(this.contents, this.dragIndex, dropIndex);
                this.$emit('rerender-list');
            }
        },
    },
    
});
