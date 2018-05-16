Lang.getWeather = function(lang_code){
	var lang = null;
	switch(lang_code){
		case Constant.EN_LANG:
			lang = {
				errorHead: "WOOPS!",
				errorText: "Something went wrong",
				todayMenuBut: "TODAY",
				tenDaysMenuBut: "10 DAYS",
				feelsLikeText: "Feels like",
				curDetailsHead: "Current details",
				humidityDetailsText: "Humidity",
				uvDetailsText: "UV index",
				windText: "Wind"
			};
			break;
		case Constant.RU_LANG:
			lang = {
				errorHead: "УПС!",
				errorText: "Что-то пошло не так",
				todayMenuBut: "СЕГОДНЯ",
				tenDaysMenuBut: "10 ДНЕЙ",
				feelsLikeText: "Чувствуется как",
				curDetailsHead: "Текущие показатели",
				humidityDetailsText: "Влажность",
				uvDetailsText: "УФ индекс",
				windText: "Ветер"
			};
			break;
	}
	return lang;
}

// WEATHER LANGS
services_lang.service("$weatherLang", ["$lang", function($lang){
	this.setLang = function($scope){
		$lang.getLang(Constant.WEATHER_VIEW, function(lang){
			Log.o("WEATHER_LANG", lang);
			$scope.errorHead = lang.errorHead;
			$scope.errorText = lang.errorText;
			$scope.todayMenuBut = lang.todayMenuBut;
			$scope.tenDaysMenuBut = lang.tenDaysMenuBut;
			$scope.feelsLikeText = lang.feelsLikeText;
			$scope.curDetailsHead = lang.curDetailsHead;
			$scope.humidityDetailsText = lang.humidityDetailsText;
			$scope.uvDetailsText = lang.uvDetailsText;
			$scope.windText = lang.windText;

			$scope.$applyAsync();
		});	
	}
}]);