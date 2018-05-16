var Location = Base.extend({
	
	lat: null,
	long: null,
	name: null,
	
	constructor: function(obj){
		this.lat = obj.lat;
		this.long = obj.long;
		this.name = obj.name;
	},

	getLat: function(){
		return this.lat;
	},

	setLat: function(lat){
		this.lat = lat;
	},

	getLong: function(){
		return this.long;
	},

	setLong: function(long){
		this.long = long;
	},

	getName: function(){
		return this.name;
	},

	setName: function(name){
		this.name = name;
	}
});