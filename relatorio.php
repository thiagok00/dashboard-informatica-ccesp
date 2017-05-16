<?php include('lib.php'); ?>
<?php if($allowReports): ?>
<?php $days = $_GET['d'] ? $_GET['d'] : 30; ?>

<html>

<head>
	<?php include('head.php'); ?>
</head>

<body>
	
	<div class="container-fluid">

		<div class="col-lg-12">
		
			<h2>Tarefas concluídas nos últimos <?php echo $days; ?> dias</h2>
				
				<div id="59167c16d38fe5a91bde871b">
				</div>

			<script>
				$(window).load(function(){
					report(<?php echo $days ?>);
				});
			</script>

		</div>
		
	</div>

	</body>

</html>

<?php endif; ?>