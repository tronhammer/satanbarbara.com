<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title>Satan Barbara</title>
		<meta name="viewport" content="user-scalable=no,initial-scale = 1.0,maximum-scale = 1.0">
		<style>
		<?php include("components/app/styles/app.main.style.css"); ?>
		</style>
		<!--[if lt IE 9]>
		<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
	</head>
	<body>
		<div id="overlay"></div>
		<div id="loading">Loading...</div>
		
		<script>
		window.SB = {};
		window.SB.arch = <?php include("components/app/data/app.arch.json"); ?>;
		window.SB.config = <?php include("components/app/data/app.config.json"); ?>;
		</script>
		<?php
			if ($_GET["env"] == "dev"){
				?>
				<script src="main.compiled.js"></script>
				<?php
			} else {
				?>
				<script data-main="components/app/app.js" src="lib/requirejs/require-2.1.9.js"></script>
				<?php 
			}
			?>
	</body>
</html>