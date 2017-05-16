<?php include('lib.php'); ?>

<html>

<head>
	<?php include('head.php'); ?>
</head>

<body>
	
	<div class="container-fluid">

		<div class="col-lg-12">
		
			<h2>Tarefas</h2>

			<?php if($allowReports): ?>

				<h2>Resumo</h2>

				<h3 id="resumo-tarefas"></h3>
				
				<h2>Relatório</h2>
				
				<h3><a href="relatorio.php">Ver relatório das tarefas concluídas nos últimos 30 dias</a></h3>
				
				<h2>Detalhes</h2>

				<h3><span id="count-59167c0f0066a6c2aaec847d"></span> Tarefas em aberto (To do)</h3>
				
				<div id="59167c0f0066a6c2aaec847d">
				</div>

				<h3><span id="count-59167c13d341ee33ad1d8bc2"></span> Tarefas sendo executadas (Doing)</h3>
				
				<div id="59167c13d341ee33ad1d8bc2">
				</div>

				<h3><span id="count-59167c16d38fe5a91bde871b"></span> Tarefas aguardando revisão (Done)</h3>
				
				<div id="59167c16d38fe5a91bde871b">
				</div>

				<h3><span id="count-59167c16d38fe5a91bde871b"></span> Tarefas sem prioridade (Backlog)</h3>
				
				<div id="591618594d59ff1811420623">
				</div>
				
			<?php else: ?>
				<h3>Seu endereço <?php echo $ip; ?> não está cadastrado para visão rápida de tarefas.</h3>
			<?php endif; ?>
			
			<h2>Guia rápido</h2>

			<ul>
				<li><a href="https://trello.com/b/u6qcGOhT/informatica-ccesp">Quadro de tarefas</a></li>
				<li><a href="horario/">Horário do pessoal</a>
			</ul>

			<h2>Links importantes</h2>

			<ul>
				<li><a href="https://trello.com/ccesppuc">Trello - Organizador da equipe</a></li>
				<li><a href="https://github.com/CCESP">Github - repositório de códigos</a></li>
				<li><a href="https://twitter.com/ccesp">Twitter - Rede social</a></li>
				<li><a href="https://www.youtube.com/channel/UCr5nNL1c3SwuUbtdwhseGLw">Youtube - repositório de vídeos</a></li>
			</ul>

			<h2><a href="mailto:informatica@ccesp.puc-rio.br">Contato</a></h2>

			<?php if($allowReports): ?>
			<script>
				$(window).load(function(){
					mainPage();
				});
			</script>
			<?php endif; ?>

		</div>
		
	</div>

	</body>

</html>
