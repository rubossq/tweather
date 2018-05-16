var Wind = Base.extend({
	
	value: null,
	direction: null,
	unit: null,
	icon: null,
	
	constructor: function(obj){
		this.value = obj.value;
		this.direction = obj.direction;
		this.unit = obj.unit;
		this.icon = obj.icon;
	},

	getValue: function(){
		return this.value;
	},

	setValue: function(value){
		this.value = value;
	},

	getDirection: function(){
		return this.direction;
	},

	setDirection: function(direction){
		this.direction = direction;
	},

	getUnit: function(){
		return this.unit;
	},

	setUnit: function(unit){
		this.unit = unit;
	},

	getIcon: function(){
		return this.icon;
	},

	setIcon: function(icon){
		this.icon = icon;
	}
});