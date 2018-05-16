var Details = Base.extend({
	
	ut: null,
	wind: null,
	pp: null,
	uv: null,
	humidity: null,
	up: null,
	
	constructor: function(obj){
		this.ut = new UnitTemperature(obj.ut);
		this.wind = new Wind(obj.wind);
		this.pp = obj.pp;
		this.uv = new UV(obj.uv);
		this.humidity = obj.humidity;
		this.up = new UnitPresentation(obj.up);
	},

	getUt: function(){
		return this.ut;
	},

	setUt: function(ut){
		this.ut = ut;
	},

	getWind: function(){
		return this.wind;
	},

	setWind: function(wind){
		this.wind = wind;
	},

	getPp: function(){
		return this.pp;
	},

	setPp: function(pp){
		this.pp = pp;
	},

	getUv: function(){
		return this.uv;
	},

	setUv: function(uv){
		this.uv = uv;
	},

	getHumidity: function(){
		return this.humidity;
	},

	setHumidity: function(humidity){
		this.humidity = humidity;
	},

	getUp: function(){
		return this.up;
	},

	setUp: function(up){
		this.up = up;
	}
});