<?php
	namespace Weather\Lib\Common;

	class Location{
		private $lat;
		private $long;
		private $name;

		public function __construct($lat, $long){
			$this->lat = $lat;
			$this->long = $long;
		}

		/**
		 * @return mixed
		 */
		public function getName()
		{
			return $this->name;
		}

		/**
		 * @param mixed $name
		 */
		public function setName($name)
		{
			$this->name = $name;
		}

		/**
		 * @return mixed
		 */
		public function getLat()
		{
			return $this->lat;
		}

		/**
		 * @param mixed $lat
		 */
		public function setLat($lat)
		{
			$this->lat = $lat;
		}

		/**
		 * @return mixed
		 */
		public function getLong()
		{
			return $this->long;
		}

		/**
		 * @param mixed $long
		 */
		public function setLong($long)
		{
			$this->long = $long;
		}

		public function isValid(){
			return $this->lat && $this->long && $this->lat != "null" && $this->long != "null";
		}

		public function getArr(){
			return array("lat"=>$this->lat, "long"=>$this->long, "name"=>$this->name);
		}

		public function __toString()
		{
			return $this->lat . "," . $this->long;
		}

	}
?>
