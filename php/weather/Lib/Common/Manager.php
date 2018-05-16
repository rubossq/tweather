<?php
	namespace Weather\Lib\Common;

	class Manager{

		public static function getExecuteTime(){
			return (microtime(true) - $_SERVER["REQUEST_TIME_FLOAT"]);
		}

	}
?>
