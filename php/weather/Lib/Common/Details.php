<?php
	namespace Weather\Lib\Common;

	class Details{

		private $ut;
		private $wind;
		private $pp;
		private $uv;
		private $humidity;
		private $up;

		public function __construct(UnitTemperature $ut, Wind $wind, UV $uv ,UnitPresentation $up, $humidity,  $pp){
			$this->ut = $ut;
			$this->wind = $wind;
			$this->uv = $uv;
			$this->up = $up;
			$this->humidity = $humidity;
			$this->pp = $pp;
		}

		public function getArr(){
			return array("ut"=>$this->ut->getArr(), "wind"=>$this->wind->getArr(), "uv"=>$this->uv->getArr(),
						 "up"=>$this->up->getArr(), "humidity"=>$this->humidity, "pp"=>$this->pp);
		}
	}
?>
