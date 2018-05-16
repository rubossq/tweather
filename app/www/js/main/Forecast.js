var Forecast = Base.extend({
	
	country: null,
	city: null,
	
	constructor: function(obj){
		this.country = obj.country;
		this.city = obj.city;
	},

	getCountry: function(){
		return this.country;
	},

	setCountry: function(country){
		this.country = country;
	},

	getCity: function(){
		return this.city;
	},

	setCity: function(city){
		this.city = city;
	}
});