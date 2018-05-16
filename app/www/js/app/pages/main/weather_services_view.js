services_views.service("$weatherView", ["$constructor", "$action", "$geo", function($constructor, $action, $geo){
	var self = this;

	var $slider = "";

	this.manageView = function($scope, response){
		if(response.status == Constant.OK_STATUS){
			this.okView($scope, response);
		}else{
			this.errView($scope, response);
		}
		$scope.$applyAsync();
		$(".loader").css("display", "none");
	}
	
	this.okView = function($scope, response){
		switch(response.action){
			case "forecast":
				this.forecastOk($scope, response);
				break;
		}
	}
	
	this.errView = function($scope, response){
		switch(response.action){
			case "forecast":
				this.forecastErr($scope, response);
				break;
		}
	}
	
	this.forecastOk = function($scope, response){
		$(".main-block").css("display", "block");
		// set today
		setFullDay($scope, response.data.fullday);

		// set 10 days
		setShortDays($scope, response.data.shortdays);

		// set cur location
		setLocation($scope, response.data.location);
		
		setSlider();

		// allow vertical scroll
		stopPropagate();

		$(".error-reload").removeClass("error-reload-active");
		$(".error-block").css("display", "none");
	}

	this.forecastErr = function($scope, response){
		$(".error-reload").removeClass("error-reload-active");
		$(".error-block").css("display", "table");
	}

	this.reload = function($scope){
		$geo.clearGeo();

		$(".error-reload").addClass("error-reload-active");
		$action.forecast($scope);
	}

	this.switchContent = function(view){
		// slide to view
		window.mySwipe.slide(view, 500);
		// clear active but
		$(".menu-but").each(function(){
			$(this).removeClass("menu-active");
		});
		// set active but
		$(".menu-but").eq(view).addClass("menu-active");
	}

	this.toogleDays = function(index){
		var elem = $(".days-elem").eq(index);
		if(elem.attr("add-info") == "true"){
			elem.find(".days-elem-hidden").slideUp();
			elem.attr("add-info", "false");
		}else{
			elem.find(".days-elem-hidden").slideDown();
			elem.attr("add-info", "true");
		}
	}

	this.setDaysName = function($scope, index, text){
		if(index == 0){
			$(".days-elem-left-date").eq(index).text($scope.todayMenuBut);
		}else{
			$(".days-elem-left-date").eq(index).text(text.split(",")[0]);
		}
	}

	function setFullDay($scope, fullday){
		var fullday = $constructor.createFullDay(fullday);

		$scope.curDate = fullday.getDateTime();

		// set temperature
		$scope.curTemp = fullday.getDetails().getUt().getTemperature().getValue();
		$scope.feelsLikeTemp = fullday.getDetails().getUt().getTemperatureSide().getValue();
		$scope.curTempUnit = fullday.getDetails().getUt().getTemperature().getUnit();

		// set weather state
		$(".today-temp-image").attr("src", fullday.getDetails().getUp().getIcon());
		$scope.weatherState = fullday.getDetails().getUp().getIconPhrase();

		// set all hours
		$scope.hours = fullday.getHours();

		// set details
		$scope.humidityDetails = fullday.getDetails().getHumidity();
		$scope.uvDetails = fullday.getDetails().getUv().getIndex();

		// set wind
		$scope.windNum = fullday.getDetails().getWind().getValue();
		$(".today-wind-image").attr("src", fullday.getDetails().getWind().getIcon());
		$scope.windUnit = fullday.getDetails().getWind().getUnit();
	}

	function setShortDays($scope, shortdays){
		var shortdays = $constructor.createShortDays(shortdays);

		$scope.days = shortdays;
	}

	function setLocation($scope, location){
		var location  = $constructor.createLocation(location);

		$scope.curLocation = location.getName();
	}

	function setSlider(){
		var elem = document.getElementById('mySwipe');
		window.mySwipe = Swipe(elem, {
			startSlide: 0,
			continuous: false,
			disableScroll: false,
			stopPropagation: true,
			callback: function(index, element){
				// clear active but
				$(".menu-but").each(function(){
					$(this).removeClass("menu-active");
				});
				// set active but
				$(".menu-but").eq(index).addClass("menu-active");
			},
			transitionEnd: function(index, element){}
		});

		// set height of content
		$(".swipe").css("height", $(window).height() - $(".main-top").outerHeight(true));
	}

	function stopPropagate(){
		$(".today-hours, .today-wind-hours").on("touchstart", function(e){
			e.stopPropagation();
		});
	}
}]);