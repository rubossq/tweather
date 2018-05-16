var FullDayUnit = DayUnit.extend({
	
	hours: null,
	
	constructor: function(obj, hours){
		this.base(obj);
		this.hours = new Array();
		for(var index in hours){
			var h = hours[index];
			this.hours.push(new HourUnit(h));
		}
	},

	getHours: function(){
		return this.hours;
	},

	setHours: function(hours){
		this.hours = hours;
	}
});