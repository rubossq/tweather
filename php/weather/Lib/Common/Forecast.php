<?php
	namespace Weather\Lib\Common;

	class Forecast{

		private $country;
		private $city;


		public function __construct($lat, $long){
			$this->lat = $lat;
			$this->long = $long;
		}

	}
?>
