<meta charset="utf-8" />
<script src="http://code.jquery.com/jquery-1.7.1.min.js"></script>
<script src="https://api.trello.com/1/client.js?key=19def28e1d0f828718a9b17339657eff"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous" />

<?php if($allowReports): ?>
<script src="js/trello.js"></script>
<?php endif; ?>

<style>
	.prazo-expirou {
		color: red;
	}
	
	.prazo-ok {
		color: green;
	}
	
	.prazo-warning {
		color: orange;
	}
</style>