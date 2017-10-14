var vm = new Vue({
	el: "#calculator",
    data: {
    	displayResult: "0",
        mathResult: 0,
        buttonType: 'init',
        optState: 'none',
    },
    methods: {
    	pressButton: function(n){
        	switch(n) {
            	case 1: case 2: case 3: case 4: case 5:
                case 6: case 7: case 8: case 9: {
                	if(this.buttonType == 'opt') {
                    	this.displayResult = n.toString();
                    }
                    else {
                        if(this.displayResult == '0'){
                            this.displayResult = '';
                        }

                        this.displayResult += n.toString();
                    }
                    this.buttonType = 'num';
                    break;
                }
                case 0: {
                    if(this.displayResult != '0' && this.buttonType != 'opt'){
                        this.displayResult += n.toString();
                    }
                    break;
                }
                case '.': {
                	if(!this.displayResult.includes('.')){
                        console.log(typeof(n));
                        this.displayResult += '.';
                    }
                    break;
                }
                case 'plusmn': {
                	var term = parseFloat(this.displayResult);
                    console.log(term);
                    
                    if(term < 0)
                    	this.displayResult = this.displayResult.slice(1);
                    else if (term>0)
                    	this.displayResult = '-' + this.displayResult;
                    break;
                }
                default:
                    alert('input error!!');
                    break;
            };
        	console.log(n, this.displayResult, this.mathResult, this.buttonType);
        },	
        
        pressOperator: function(opt){
        	var term = parseFloat(this.displayResult);
        
        	switch(this.optState){
            	case 'plus': {
                	this.mathResult += term;
                    break;
                }
                case 'minus': {
                	this.mathResult -= term;
                    this.optState = 'minus';
                    break;
                }
                case 'times': {
                	if(this.mathResult == 0){
                    	this.mathResult = 1;
                    }
                	this.mathResult *= term;
                    this.optState = 'times';
                	break;
                }
                case 'divide': {
                	this.mathResult /= term;
                    this.optState = 'divide';
                	break;
                }
                case 'none':  case 'calcu': {
	                this.mathResult = term;
                    break;
                }
                default:
                	alert('Input type error!');
                	break;
            };
            
            this.optState = opt;
            this.displayResult = this.mathResult;
        	this.buttonType = 'opt';
            console.log(opt, this.mathResult);
        },
        
        clearInput: function(){
        	this.displayResult = '0';
            this.mathResult = 0;
            this.buttonType = 'init';
            this.optState = 'none';
        },
        
        backSpace: function(){
        	console.log(this.displayResult);
            if (this.displayResult.length == 1){
            	this.displayResult = '0';
            }
        	else if( this.displayResult.length > 0 ){
                this.displayResult = this.displayResult.slice(0,-1);
            }
        },
    },
});
