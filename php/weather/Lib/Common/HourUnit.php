<?php
	namespace Weather\Lib\Common;

	class HourUnit{

		protected $dateTime;
		protected $details;

		public function __construct($dateTime, $details){
			$this->dateTime = $dateTime;
			$this->details = $details;
		}

		public function getArr(){
			return array("dateTime"=>$this->dateTime, "details"=>$this->details->getArr());
		}
	}
?>
