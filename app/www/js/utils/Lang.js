function Lang(){}

Lang.getLang = function(lang_code, view){
	var lang = null;
	switch(view){
		case Constant.WEATHER_VIEW:
			lang = Lang.getWeather(lang_code);
			break;
	}
	return lang;
}