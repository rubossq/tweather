<?php
	namespace Weather\Lib\Common;

	class DayUnit{

		protected $sunset;
		protected $sunrise;
		protected $dateTime;
		protected $details;

		public function __construct($dateTime, $details, $sunset="", $sunrise=""){
			$this->sunset = $sunset;
			$this->sunrise = $sunrise;
			$this->dateTime = $dateTime;

			$this->details = $details;
		}

		public function getArr(){
			return array("sunset"=>$this->sunset, "sunrise"=>$this->sunrise, "dateTime"=>$this->dateTime, "details"=>$this->details->getArr());
		}
	}
?>
