<?php
	namespace Weather\Lib\Common;

	class FullDayUnit extends DayUnit{

		private $hours;

		public function __construct($sunset, $sunrise, $dateTime, $details, $hours){
			parent::__construct($dateTime, $details, $sunset, $sunrise);
			$this->hours = $hours;
		}

		public function getArr(){
			$hours = array();
			foreach($this->hours as $h){
				$hours[] = $h->getArr();
			}
			return array("dayUnit"=>parent::getArr(), "hours"=>$hours);
		}
	}
?>
