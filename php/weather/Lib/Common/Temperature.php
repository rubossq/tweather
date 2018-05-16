<?php
	namespace Weather\Lib\Common;

	class Temperature{

		private $value;
		private $unit;

		const CELSIUS = 'c';
		const FAHRENHEIT = 'f';

		public function __construct($value, $unit = self::CELSIUS){
			$this->value = $value;
			$this->unit = $unit;
		}


		public function getArr(){
			return array("value"=>$this->value, "unit"=>$this->unit);
		}
	}
?>
