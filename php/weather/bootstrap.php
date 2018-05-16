<?
	use Weather\Core\Route;
	use Weather\Lib\Utils\Constant;


	if(Constant::CURRENT_MODE == Constant::DEBUG_MODE){
		ini_set('display_errors', 1);
	}else{
		error_reporting(0);
	}

	Route::start(); // запускаем маршрутизатор
?>