var Connector = Base.extend({

	constructor: function(){
		
	},

	forecast: function(lang, lat, long, callback){
		this.request("main", "forecast", {lang: lang, lat: lat, long: long}, function(response){
			Log.o("GET_DATA_SUMM", response);
			if(response.status == Constant.OK_STATUS){
				callback({status:Constant.OK_STATUS, fullday: response.object.fullday,
						  location: response.object.location, shortdays: response.object.shortdays});
			}else{
				callback({status: response.status});
			}
		}, true);
		
	},
	
	request: function(controller, action, params, callback, cancelSecure){
		
		var self = this;
		var url = Constant.SERVER_HOST + controller + "/" + action + "/";
		var parStr = this.parseParams(params);
		var paramsStr = parStr;
		Log.d("REQUEST", "url = " + url);
		Log.d("REQUEST", "params = " + parStr);
		
		var tryCnt = 0;
		
		$.ajax({
			url: url,
			cache: false,
			type: 'POST',								//maybe error with post
			crossDomain: true,							//?? jquery error
			xhrFields: { withCredentials:true },
			dataType: 'json',
			data: paramsStr,
			success: function(response){
				var obj = response.response;

				Log.d("RESPONSE", "resp");
				
				callback(obj);
			},
			error: function(e){
				//alert("GET BUG");
				self.requestTry(controller, action, params, callback, tryCnt, cancelSecure);
			}
		});
	},
	
	requestTry: function(controller, action, params, callback, tryCnt, cancelSecure){
		var self = this;
		if(tryCnt > Constant.MAX_REQUESTS_CONNECTION)
			callback({status: Constant.ERR_CODE_CONNECTOR_CONNECTION});
		else{
			tryCnt++;
			var url = Constant.SERVER_HOST + controller + "/" + action + "/";
			var parStr = this.parseParams(params);
			var paramsStr = parStr;
			Log.d("REQUEST", "url = " + url);
			Log.d("REQUEST", "params = " + parStr);
			
			
			$.ajax({
				url: url,
				cache: false,
				type: 'POST',								//maybe error with post
				crossDomain: true,							//?? jquery error
				xhrFields: { withCredentials:true },
				dataType: 'json',
				data: paramsStr,
				success: function(response){
					var obj = response.response;
					
					Log.d("RESPONSE", "resp");
					callback(obj);
				},
				error: function(e){
					//alert("GET BUG");
					self.requestTry(controller, action, params, callback, tryCnt, cancelSecure);
				}
			});
		}
	},
	
	parseParams: function(params){
		var arr = new Array();
		for(param in params){
			arr.push(param + "=" + params[param]);
		}
		return arr.join("&");
	}
	
});