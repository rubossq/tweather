<?
	use Weather\Core\Route as Route;
?>
<html lang="ru">
<head>
<title><?=$data["title"];?></title>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<link rel="stylesheet" type="text/css" href="<? echo  Route::getUrl()."/css/style.css" ?>" />
<script src="<? echo  Route::getUrl()."/js/jquery.js" ?>"></script>
</head>
<body>
	<?php include 'weather/Views/'.$content_view; ?>
</body>
</html>