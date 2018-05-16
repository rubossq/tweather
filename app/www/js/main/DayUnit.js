var DayUnit = Base.extend({
	
	sunset: null,
	sunrise: null,
	dateTime: null,
	details: null,
	
	constructor: function(obj){
		this.sunset = obj.sunset;
		this.sunrise = obj.sunrise;
		this.dateTime = obj.dateTime;
		this.details = new Details(obj.details);
	},

	getSunset: function(){
		return this.sunset;
	},

	setSunset: function(sunset){
		this.sunset = sunset;
	},

	getSunrise: function(){
		return this.sunrise;
	},

	setSunrise: function(sunrise){
		this.sunrise = sunrise;
	},

	getDateTime: function(){
		return this.dateTime;
	},

	setDateTime: function(dateTime){
		this.dateTime = dateTime;
	},

	getDetails: function(){
		return this.details;
	},

	setDetails: function(details){
		this.details = details;
	}
});