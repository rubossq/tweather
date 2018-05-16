services.service("$manager", ["$rootScope", function($rootScope){
	this.instance = new Manager($rootScope);
}]);

services.service("$action",["$manager", "$lang", "$geo", function($manager, $lang, $geo){
	var self = this;

	this.forecast = function($scope){
		var isWaiting = true;
		$geo.getLocation(function(position){
			if(isWaiting){
				console.log("AWD");
				isWaiting = false;
				$manager.instance.getConnector().forecast($lang.getRealLocale(), position.lat, position.long, function(result){	//try to add
					if(result.status == Constant.OK_STATUS){
						$scope.response({action: "forecast", status: Constant.OK_STATUS,
										data: {fullday: result.fullday, location: result.location, shortdays: result.shortdays}});
					}else{
						$scope.response({action: "forecast", status: Constant.ERR_STATUS, data: {errorCode: Constant.ERR_CODE_CONNECTOR_CONNECTION}});
					}
				});
			}
		});
		
	}

}]);

services.service("$geo", function(){
	var self = this;
	var geo = null;

	this.getLocation = function(callback){
		setTimeout(function(){
			if(!geo){
				geo = {lat:null, long:null};
				callback(geo);
			}
		}, 3000);
		navigator.geolocation.getCurrentPosition(function(position){
			geo = {lat:position.coords.latitude, long:position.coords.longitude};
			callback(geo);
		},function(){
			geo = {lat:null, long:null};
			callback(geo);
		},{
			enableHighAccuracy: true
		});
	}

	this.getGeo = function(){
		return geo;
	}

	this.clearGeo = function(){
		geo = null;
	}

});

services.service("$constructor", ["$geo", function($geo){
	var self = this;
	
	this.createFullDay = function(fullday){
		return new FullDayUnit(fullday.dayUnit, fullday.hours);
	}

	this.createShortDays = function(shortdays){
		var sd = new Array();
		for(var i in shortdays){
			var d = shortdays[i].dayUnit;
			sd.push(new ShortDayUnit(d));
		}
		return sd;
	}

	this.createLocation = function(location){
		var geo = $geo.getGeo();
		geo.name = location;
		return new Location(geo);
	}

}]);

services.service("$lang", function(){
	var self = this;
	this.locale = "";
	this.list = new Array();
	this.fullLocale = "";
	
	var setLocale = function(locale){
		self.fullLocale = locale.value;
		var locale = locale.value.split("-");
		Log.d("CUR_LOCALE", self.fullLocale);
		self.locale = locale[0];		//need parse
		self.setLangs();
	}
	
	this.getLang = function(view, callback){
		this.list.push({view: view, callback: callback});
		if(self.locale != ""){
			self.setLangs();
		}
	}
	
	this.setLangs = function(){
		while(self.list.length > 0){
			var entity = self.list.shift();
			var lang = null;
			switch(self.locale){
				case Constant.EN_LANG:
					lang = Lang.getLang(Constant.EN_LANG, entity.view);
					break;
				case Constant.UA_LANG:
				case Constant.BE_LANG:
				case Constant.RU_LANG:
					lang = Lang.getLang(Constant.RU_LANG, entity.view);
					break;
				default:
					lang = Lang.getLang(Constant.EN_LANG, entity.view);
					break;
			}
			entity.callback(lang);
		}
	}
	
	this.getLocale = function(){
		if(this.locale != Constant.RU_LANG)
			return Constant.EN_LANG;
		return this.locale;
	}
	
	this.getRealLocale = function(){
		return this.locale;
	}

	this.getFullLocale = function(){
		return this.fullLocale;
	}

	navigator.globalization.getLocaleName(function(locale) {
		setLocale(locale);
	}, function(){
		setLocale("en-US");
	});
});
