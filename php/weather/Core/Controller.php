<?

namespace Weather\Core;

class Controller {

	protected $model;
	protected $view;
	protected $query;
	
	function __construct()
	{
		$this->view = new View();
	}
	
	public function setQuery($query){
		$this->query = $query;
	}
	
}
?>