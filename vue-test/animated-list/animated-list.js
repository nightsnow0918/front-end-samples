Vue.config.devtools = true;

function Position(top, left){
    this.topValue = top;
    this.leftValue = left;
    this.top = this.topValue + 'px';
    this.left = this.leftValue + 'px';

    this.setPosition = function(top, left){
        this.top = top + 'px';
        this.left = left + 'px';
        this.topValue = top;
        this.leftValue = left;
    };

    this.moveRight = function(num){
        this.leftValue += num;
        this.left = this.leftValue + 'px';
    };

    this.moveDown = function(num){
        this.topValue += num;
        this.top = this.topValue + 'px';
    };

    this.getPosition = function(){
        return {
            top: this.top,
            left: this.left,
        };
    }
};


function vueSwap(arr, i1, i2){
    var tmp = arr[i1];
    arr.$set(i1, arr[i2]);
    arr.$set(i2, tmp);
};


Vue.component('square', {
    template: '<div class="square" transition="square">{{value}}</div>',
    props: ['value'],
});


var vm = new Vue({
    el: "#square-panel",
    data: {
        squares: [{value: 0}, {value: 1}, {value: 2}, {value: 3},],
        kbmode: false,
        select01: "1",
        select02: "1",
    },
    computed: { 
        squareStyle: function(){
            var styles = [0, 0, 0, 0];
            for(var i=0; i<this.squares.length; i+=1){
                var vb = this.squares[i].value!=0 ? 'visible' : 'hidden' ;
                styles[i] = {visibility: vb};
            }
            return styles;
        },
    },
    created: function(){
        this.squares.printValue = function(){
            var str = "";
            for(var i=0; i<this.length; i++){
                str += this[i].value + " ";
            }
            console.log(str);
        };
    },
    methods: {
        shiftLeft: function(){
            var sq = this.squares.shift();
            this.squares.push(sq);
        },

        shiftRight: function(){
            var sq = this.squares.pop();
            this.squares.unshift(sq);
        },

        addNew: function(){
            var last = this.squares[this.squares.length-1];
            this.squares.push({value: last.value+1});
        },

        removeLast: function(){
            this.squares.pop();
        },

        swap: function(){
            vueSwap(this.squares, this.select01, this.select02);
        },


        shuffle: function(){
            this.squares = _.shuffle(this.squares);
        },

        printVisibility: function(){
            var str = "";
            for(var i=0; i<this.squareStyle.length; i++){
                str += this.squareStyle[i].visibility + " ";
            }
            console.log(str);
        },
    },
});


var vm2 = new Vue({
    el: "#square-panel-2",
    data: {
        squares2: [{value: 0}, {value: 2}, {value: 0}, {value: 3}, {value: 0}],
    },
    computed: {
        squareStyle2: function(){
            var styles = [0, 0, 0, 0];
            for(var i=0; i<this.squares2.length; i+=1){
                var vb = this.squares2[i].value!=0 ? 'visible' : 'hidden' ;
                styles[i] = {visibility: vb};
            }
            return styles;
        },
    },

    methods: {
        oneRowMove: function(arr){
            var start_index = 0;
            for(var i=0; i<arr.length; i++){
                if(arr[i].value!=0){
                    vueSwap(arr, start_index, i);
                    start_index ++;
                }
            }
        },

        move2left: function(){
            this.oneRowMove(this.squares2);
        },

        move2right: function(){
            this.squares2 = this.squares2.reverse();
            this.oneRowMove(this.squares2);
            this.squares2 = this.squares2.reverse();
        },
    },
});


var vm3 = new Vue({
    el: "#the-matrix",
    data: {
        matrix: [[0,1,2,3], [4,5,6,7], [8,9,10,11], [12,13,14,15]],
    },
    methods: {
        matrix_shuffle: function(){
            this.matrix = _.flatten(this.matrix);
            this.matrix = _.shuffle(this.matrix);
            this.matrix = _.chunk(this.matrix, 4);
            console.log(this.matrix);
        },

        matrix_shift: function(row_index){
            var sq = this.matrix[row_index].shift();
            this.matrix[row_index].push(sq);    
        },

        matrix_row_shift: function(){
            var row = this.matrix.shift();
            this.matrix.push(row);
        },
    },
});


var vm4 = new Vue({
    el: '#the-matrix-2',

    data: {
        matrix2: _.range(16),
    },

    methods: {
        matrix2_shuffle: function(){
            this.matrix2 = _.shuffle(this.matrix2);
        },

    },
});


_.transpose = function(mtx){
    return _.zip.apply(_, mtx);
}

var vm5 = new Vue({
    el: "#the-matrix-3",
    data: {
        ori_matrix: [
            [0, 0, 2, 0], 
            [4, 0, 0, 0], 
            [0, 9, 0, 0], 
            [0, 0, 0, 15],
        ],
        matrix: [],
    },
    computed: { 
        squareStyle: function(){
            var styles = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],];
            for(var i=0; i<this.matrix.length; i+=1){
                for(var j=0; j<this.matrix[i].length; j+=1){
                    var vb = this.matrix[i][j]!=0 ? 'visible' : 'hidden' ;
                    styles[i][j] = {visibility: vb};
                }
            }
            return styles;
        },
    },

    created: function(){
        this.matrix = this.ori_matrix.slice();
    },

    methods: {
        oneRowMove: function(arr){
            var start_index = 0;
            for(var i=0; i<arr.length; i++){
                if(arr[i]!=0){
                    vueSwap(arr, start_index, i);
                    start_index ++;
                }
            }
        },

        move2left_2: function(){
            for(var i=0; i<this.matrix.length; i++){
                this.oneRowMove(this.matrix[i]);
            }
        },

        transpose: function(){
            _.transpose(this.matrix);
            console.log(this.matrix);
        },

        reset: function(){
            for(var i=0; i<this.matrix; i++){
                this.matrix.$set(i, this.ori_matrix[i]);
            }
            console.log(this.matrix);
        },

    },
});
