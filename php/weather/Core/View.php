<?
namespace Weather\Core;

use Weather\Lib\Utils\Constant;

class View
{
	function generate($content_view, $template_view, $data = null)
	{
		include Constant::VIEWS_PATH . $template_view;
	}

	function generateSolo($content_view, $data)
	{
		include Constant::VIEWS_PATH . $content_view;
	}

	function generateJSON($response){
		echo json_encode($response->getArr());
		die;
	}

}
?>