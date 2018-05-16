var UnitTemperature = Base.extend({
	
	temperature: null,
	temperatureSide: null,
	
	constructor: function(obj){
		this.temperature = new Temperature(obj.temperature);
		this.temperatureSide = new Temperature(obj.temperatureSide);
	},

	getTemperature: function(){
		return this.temperature;
	},

	setTemperature: function(temperature){
		this.temperature = temperature;
	},

	getTemperatureSide: function(){
		return this.temperatureSide;
	},

	setTemperatureSide: function(temperatureSide){
		this.temperatureSide = temperatureSide;
	}
});