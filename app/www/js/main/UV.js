var UV = Base.extend({
	
	index: null,
	text: null,
	
	constructor: function(obj){
		this.index = obj.index;
		this.text = obj.text;
	},

	getIndex: function(){
		return this.index;
	},

	setIndex: function(index){
		this.index = index;
	},

	getText: function(){
		return this.text;
	},

	setText: function(text){
		this.text = text;
	}
},{
	LOW_LIMIT: 3,
	MEDIUM_LIMIT: 6,
	HIGH_LIMIT: 10
});