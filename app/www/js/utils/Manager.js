var Manager = Base.extend({
	connector: null,
	$rootScope: null,
	
	constructor: function($rootScope){
		Manager.instance = this;
		this.$rootScope = $rootScope;
		this.connector = new Connector();
	},
	
	/* get and set Manager.connector */
	setConnector: function(connector){
		this.connector = connector;
	},
	
	getConnector: function(){
		return this.connector;
	}
},{ 
	instance: this
});