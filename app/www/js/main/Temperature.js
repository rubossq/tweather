var Temperature = Base.extend({
	
	value: null,
	unit: null,
	
	constructor: function(obj){
		this.value = obj.value;
		this.unit = obj.unit;
	},

	getValue: function(){
		return this.value;
	},

	setValue: function(value){
		this.value = value;
	},

	getUnit: function(){
		return this.unit;
	},

	setUnit: function(unit){
		this.unit = unit;
	}
},{
	CELSIUS: 'c',
	FAHRENHEIT: 'f'
});