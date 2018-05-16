<?php
	namespace Weather\Lib\Common;

	class UnitPresentation{

		private $icon;
		private $iconPhrase;

		public function __construct($icon, $iconPhrase){
			$this->icon = self::prepareImage($icon);
			$this->iconPhrase = $iconPhrase;
		}

		public function prepareImage($icon){
			$icon = str_replace("/k/", "/v4/", $icon);
			$icon = str_replace(".gif", ".svg", $icon);
			return $icon;
		}

		public function getArr(){
			return array("icon"=>$this->icon, "iconPhrase"=>$this->iconPhrase);
		}
	}
?>
