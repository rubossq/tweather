var UnitPresentation = Base.extend({
	
	icon: null,
	iconPhrase: null,
	
	constructor: function(obj){
		this.icon = obj.icon;
		this.iconPhrase = obj.iconPhrase;
	},

	getIcon: function(){
		return this.icon;
	},

	setIcon: function(icon){
		this.icon = icon;
	},

	getIconPhrase: function(){
		return this.iconPhrase;
	},

	setIconPhrase: function(iconPhrase){
		this.iconPhrase = iconPhrase;
	}
});