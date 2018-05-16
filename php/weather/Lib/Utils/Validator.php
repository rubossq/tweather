<?php
namespace Weather\Lib\Utils;
class Validator{

	public static function clear($var){
		return addslashes(htmlspecialchars(strip_tags(trim($var))));
	}

}

?>