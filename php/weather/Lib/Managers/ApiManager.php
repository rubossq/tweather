<?
namespace Weather\Lib\Managers;

use Weather\Lib\Common\Details;
use Weather\Lib\Common\FullDayUnit;
use Weather\Lib\Common\HourUnit;
use Weather\Lib\Common\Response;
use Weather\Lib\Common\ShortDayUnit;
use Weather\Lib\Common\Temperature;
use Weather\Lib\Common\UnitPresentation;
use Weather\Lib\Common\UnitTemperature;
use Weather\Lib\Common\UV;
use Weather\Lib\Common\Wind;
use Weather\Lib\Utils\Constant;

class ApiManager{

	const API_URL = "http://api.wunderground.com/api/%key%/geolookup/conditions/astronomy/forecast10day/hourly/lang:%lang%/q/%location%.json";
	const API_URL_IP = "http://api.wunderground.com/api/%key%/geolookup/conditions/astronomy/forecast10day/hourly/lang:%lang%/q/autoip.json?geo_ip=%ip%";

	const API_KEY = "8b7aaf0940265d0e";
	const HOURS_LIMIT = 12;

	public static function api($lang, $location){
		$lang = strtoupper($lang);
		$lang = self::isLangAvailable($lang) ? $lang : "EN";
		if($location->isValid()){
			$query = self::API_URL;
			$query = str_replace("%location%", $location, $query);
		}else{
			$query = self::API_URL_IP;
			$ip = self::getIp();
			$query = str_replace("%ip%", $ip, $query);
		}

		$query = str_replace("%key%", self::API_KEY, $query);

		$queryEn = str_replace("%lang%", "EN", $query);;
		$query = str_replace("%lang%", $lang, $query);


		//echo $query;
		$response = file_get_contents($query);
		if($lang != "EN"){
			$responseEn = file_get_contents($queryEn);
		}else{
			$responseEn = $response;
		}
		//file_put_contents("temp.txt", $response);

		//$response = file_get_contents("temp.txt");

		$json = json_decode($response);
		$jsonEn = json_decode($responseEn);
		//echo $response;exit;
		$dataConditions = self::parseConditions($json, $jsonEn, $lang);
		$dataForecast = self::parseForecast($json, $jsonEn);

		//echo $dataConditions->getStatus() . " " . $dataForecast->getStatus();

		if($dataConditions->getStatus() == Constant::OK_STATUS &&
			$dataForecast->getStatus() == Constant::OK_STATUS){
			$data = new Response("api", Constant::OK_STATUS, "", array_merge($dataConditions->getObject(), $dataForecast->getObject()));
		}else{
			$data = new Response("api", Constant::ERR_STATUS, "Can not get some data");
		}


		return $data;
	}

	public static function getIp(){
		if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
			$ip = $_SERVER['HTTP_CLIENT_IP'];
		} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
			$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
		} else {
			$ip = $_SERVER['REMOTE_ADDR'];
		}

		return $ip;
	}

	public static function parseConditions($response, $responseEn, $lang){

		try{
			$conditions = $response->current_observation;
			$conditionsEn = $responseEn->current_observation;

			$wind = new Wind($conditions->wind_kph, $conditionsEn->wind_dir);
			$up = new UnitPresentation($conditions->icon_url, $conditions->weather);
			$ut = new UnitTemperature(new Temperature($conditions->temp_c), new Temperature($conditions->feelslike_c));
			$uv = new UV($conditions->UV);
			$details = new Details($ut, $wind, $uv, $up, $conditions->relative_humidity, 0);

			$sunPhase = $response->sun_phase;
			$sunrise = $sunPhase->sunrise->hour.":".$sunPhase->sunrise->minute;
			$sunset = $sunPhase->sunset->hour.":".$sunPhase->sunset->minute;
			$dateTime = $conditions->local_time_rfc822;


			$hours = array();

			$hourlyForecast = $response->hourly_forecast;
			$hourlyForecastEn = $responseEn->hourly_forecast;

			for($i=0; $i<count($hourlyForecast); $i++){
				$h = $hourlyForecast[$i];
				$hEn = $hourlyForecastEn[$i];

				$hr = intval($h->FCTTIME->hour);



				if($lang == "EN"){
					$_dateTime = $hr > 12 ? $hr % 12 : $hr . " " . $h->FCTTIME->ampm;
					if($i == 0){
						$given = new \DateTime($dateTime);
						$mins =  $given->format("i");
						$hrc = intval($given->format("H"));
						$dateTime = $h->FCTTIME->month_name . " " . $h->FCTTIME->mday . ", " . $hrc > 12 ? $hrc % 12 : $hrc . ":".$mins;
					}
				}else{
					$_dateTime = $hr;
					if($i == 0){
						$given = new \DateTime($dateTime);
						$mins =  $given->format("i");
						$hrc = intval($given->format("H"));
						$dateTime = $h->FCTTIME->month_name . " " . $h->FCTTIME->mday . ", " . $hrc . ":".$mins;
					}
				}

				$_wind = new Wind($h->wspd->metric, $hEn->wdir->dir);
				$_up = new UnitPresentation($h->icon_url, $h->wx);
				$_ut = new UnitTemperature(new Temperature($h->temp->metric), new Temperature($h->feelslike->metric));
				$_uv = new UV($h->uvi);
				$_details = new Details($_ut, $_wind, $_uv, $_up, $h->humidity, 0);
				$hours[] = new HourUnit($_dateTime, $_details);

				if($i == self::HOURS_LIMIT)
					break;
			}

			$fullDay = new FullDayUnit($sunrise, $sunset, $dateTime, $details, $hours);

			$data = new Response("parseConditions", Constant::OK_STATUS, "", array("fullday"=>$fullDay->getArr(), "location"=>$conditions->display_location->full));

		}catch(\Exception $e){
			$data = new Response("parseConditions", Constant::ERR_STATUS, "Error parse");
		}


		return $data;
	}

	public static function parseForecast($response, $responseEn){
		try{
			$forecast = $response->forecast->simpleforecast->forecastday;
			$forecastEn = $responseEn->forecast->simpleforecast->forecastday;

			$forecast10 = array();
			for($i=0; $i<count($forecast); $i++){
				$f = $forecast[$i];
				$fEn = $forecastEn[$i];;
				$wind = new Wind($f->avewind->kph, $fEn->avewind->dir, false);
				$uv = new UV($f->UV);
				$ut = new UnitTemperature(new Temperature($f->high->celsius), new Temperature($f->low->celsius));
				$up = new UnitPresentation($f->icon_url, $f->conditions);
				$details = new Details($ut, $wind, $uv, $up, $f->avehumidity, 0);

				$dateTime = $f->date->weekday . ", " . $f->date->monthname_short. " " . $f->date->day;

				$ft = new ShortDayUnit($dateTime, $details);
				$forecast10[] = $ft->getArr();
			}

			$data = new Response("parseForecast", Constant::OK_STATUS, "", array("shortdays"=>$forecast10));

		}catch(\Exception $e){
			$data = new Response("parseForecast", Constant::ERR_STATUS, "Error parse");
		}


		return $data;
	}

	public static function isLangAvailable($lang){
		return in_array($lang, array("AF","AL","AR","HY","AZ","EU","BY","BU",
			"LI","MY","CA","CN","TW","CR","CZ","DK","DV","NL","EN","EO","ET",
			"FA","FI","FR","FC","GZ","DL","KA","GR","GU","HT","IL","HI","HU",
			"IS","IO","ID","IR","IT","JP","JW","KM","KR","KU","LA","LV","LT",
			"ND","MK","MT","GM","MI","MR","MN","NO","OC","PS","GN","PL","BR",
			"PA","RO","RU","SR","SK","SL","SP","SI","SW","CH","TL","TT","TH",
			"TR","TK","UA","UZ","VU","CY","SN","JI","YI"));
	}
}