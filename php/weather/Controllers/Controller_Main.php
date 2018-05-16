<?
namespace Weather\Controllers;
use Weather\Core\Controller as Controller;
use Weather\Core\View as View;
use Weather\Models\Model_Main;

class Controller_Main extends Controller
{
	function __construct()
	{
		$this->model = new Model_Main();
		$this->view = new View();
	}

	function action_forecast()
	{
		$data = $this->model->forecast();
		$this->view->generateJSON($data);
	}

}
?>