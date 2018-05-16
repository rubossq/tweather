<?php
	namespace Weather\Lib\Common;

	class UV{

		private $index;
		private $text;

		const LOW_LIMIT = 3;
		const MEDIUM_LIMIT = 6;
		const HIGH_LIMIT = 10;

		public function __construct($index){
			$this->index = abs($index);
			$this->text = "";
		}


		public function getArr(){
			return array("index"=>$this->index, "text"=>$this->text);
		}
	}
?>
