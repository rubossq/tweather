<?
namespace Weather\Models;
use Weather\Core\Model as Model;
use Weather\Lib\Common\Location;
use Weather\Lib\Common\Response;
use Weather\Lib\Managers\ApiManager;
use Weather\Lib\Utils\Constant;
use Weather\Lib\Utils\Validator;

class Model_Main extends Model
	{

		public function forecast(){
			$data =  new Response("forecast", Constant::ERR_STATUS, "Check your request, params");
			if(isset($_REQUEST['lang']) && isset($_REQUEST['lat']) && isset($_REQUEST['long'])){

				$lang = Validator::clear($_REQUEST['lang']);
				$lat = Validator::clear($_REQUEST['lat']);
				$long = Validator::clear($_REQUEST['long']);

				if(is_string($lang)){
					$data = ApiManager::api($lang, new Location($lat, $long));
				}else{
					$data =  new Response("forecast", Constant::ERR_STATUS, "Check your request, validation");
				}
			}

			return $data;
		}
		
	}
?>