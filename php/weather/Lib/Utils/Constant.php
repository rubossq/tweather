<?
namespace Weather\Lib\Utils;
class Constant{
	
	/*MODES START*/
	const DEBUG_MODE = 1;
	const RELEASE_MODE = 2;
	const CURRENT_MODE = 1;
	/*MODES END*/

	/*PATH AND SOURCES START*/
	const CONTROLLERS_PATH = "weather/Controllers/";
	const MODELS_PATH = "weather/Models/";
	const CONTROLLERS_PATH_NS = 'Weather\Controllers';
	const MODELS_PATH_NS = 'Weather\Models';
	const VIEWS_PATH = "weather/Views/";

	const CONTROLLER_MAIN = "main";
	const ACTION_INDEX = "index";

	const ACTION_PREFIX = "action_";
	const CONTROLLER_PREFIX = "Controller_";
	const MODEL_PREFIX = "Model_";
	/*PATH AND SOURCES END*/

	/*RESPONSE STATUSES START*/
	const ERR_STATUS = "err";
	const OK_STATUS = "ok";
	/*RESPONSE STATUSES END*/
}
