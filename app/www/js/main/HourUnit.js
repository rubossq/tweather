var HourUnit = Base.extend({
	
	dateTime: null,
	details: null,
	
	constructor: function(obj){
		this.dateTime = obj.dateTime;
		this.details = new Details(obj.details);
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