<?php
	namespace Weather\Lib\Common;

	class UnitTemperature{

		private $temprerature;
		private $temperatureSide;

		public function __construct(Temperature $temprerature, Temperature $temperatureSide){
			$this->temprerature = $temprerature;
			$this->temperatureSide = $temperatureSide;
		}


		public function getArr(){
			return array("temperature"=>$this->temprerature->getArr(), "temperatureSide"=>$this->temperatureSide->getArr());
		}
	}
?>
