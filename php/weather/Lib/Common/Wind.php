<?php
	namespace Weather\Lib\Common;

	class Wind{

		private $value;
		private $direction;
		private $unit;
		private $icon;

		const ICON_API = "https://vortex.accuweather.com/adc2010/m/images/icons/wind/slate/%direction%.png";
		const DEFAULT_UNIT = "kmh";

		public function __construct($value, $direction, $needIcon = true){
			$this->value = $value;
			if($needIcon){
				$this->direction = $this->parseDirection($direction);
				$this->icon = str_replace("%direction%", $this->direction, self::ICON_API);
			}else{
				$this->direction = $direction;
				$this->icon = "";
			}
			$this->unit = self::DEFAULT_UNIT;
		}

		private function parseDirection($dir){
			$d = $dir;
			if(strlen($dir) > 3){
				$d = substr($dir, 0, 1);
			}
			return $d;
		}

		public function getArr(){
			return array("value"=>$this->value, "direction"=>$this->direction, "icon"=>$this->icon, "unit"=>$this->unit);
		}
	}
?>
