<?php
	namespace Weather\Lib\Common;

	class ShortDayUnit extends DayUnit{

		public function __construct($dateTime, $details){
			parent::__construct($dateTime, $details);
		}

		public function getArr(){
			return array("dayUnit"=>parent::getArr());
		}
	}
?>
