var appkey = "19def28e1d0f828718a9b17339657eff";
var token = "2958408e2be4fa3811ba2fcb4cebe2f172995b52644aeec70ecfeb44b69a13e9";
var basePath = "https://api.trello.com/1/";

var toDoList = "59167c0f0066a6c2aaec847d";
var doingList = "59167c13d341ee33ad1d8bc2";
var doneList = "59167c16d38fe5a91bde871b";
var backlogList = "591618594d59ff1811420623";

var members = [
	{
		id: "4fbe72907027de6626027839",
		name: "Caio",
		task: {}
	},
	{
		id: "54b7c1610453d2c9a4d387eb",
		name: "Thiago",
		task: {}
	},
	{
		id: "590cb23d7cdae4be0203fde6",
		name: "Tássio",
		task: {}
	}
];

// init
for(var i = 0; i < members.length; i++) {
	members[i].task[toDoList] = 0;
	members[i].task[doingList] = 0;
	members[i].task[doneList] = 0;
	members[i].task[backlogList] = 0;
}

function getMember (id) {
	var ret = null;
	for(var j = 0; j < members.length && !ret; j++) {
		if(id === members[j].id) {
			ret = members[j];
		}
	}
	return ret;
}

function addLiToUl(ul, txt) {
	var li = document.createElement("li");
	li.innerHTML = txt;
	ul.appendChild(li);
}

function fillHTML (elemId, listId, data) {
	var parent = $(elemId);
	
	if($(elemId).length === 0) {
		return;
	}
	
	parent.append("<ul></ul>");
	parent = parent.children("ul");

	for(var i = 0; i < data.length; i++) {
		var li = document.createElement('li');
		var card = data[i];
		var people = "";
		
		if(card.idMembers.length > 0) {
			var p = [];
			for(var j = 0; j < card.idMembers.length; j++) {
				var m = getMember(card.idMembers[j]);
				p.push(m.name);
			}
			people = p.join(", ");
		}
		
		li.innerHTML = card.name;
		
		if(people) {
			li.innerHTML += " (" + people + ")";
		}
		
		if(listId === doneList) {
			var dt = new Date(card.dateLastActivity);
			var now = new Date();
			var limit = Math.round(((dt - now) / (1000 * 3600 * 24)) * 100) / 100;
		
			li.innerHTML += " <span>última atividade há: " + Math.abs(limit) + " dias</span>";
		} else if(card.due) {
			var dt = new Date(card.due);
			var now = new Date();
			var limit = Math.round(((dt - now) / (1000 * 3600 * 24)) * 100) / 100;

			if(limit > 1) {
				li.innerHTML += " <span class='prazo-ok'>prazo remanescente: " + parseInt(limit) + " dias e " + parseInt((limit % 1) * 24) + " horas </span>";
			} else if (limit > 0) {
				limit *= 24;
				li.innerHTML += " <span class='prazo-warning'>prazo remanescente: " + parseInt(limit) + " horas e " + parseInt((limit % 1) * 60) + " minutos</span>";
			} else {
				li.innerHTML += " <span class='prazo-expirou'>prazo expirou há: " + Math.abs(limit) + " dias</span>"; 
			}
		}
		
		parent.append(li);
	}
}

function checkMembers(cards, type) {
	for(var i = 0; i < cards.length; i++) {
		var card = cards[i];
		for(var j = 0; j < members.length; j++) {
			if(card.idMembers.indexOf(members[j].id) !== -1) {
				members[j].task[type]++;
			}
		}
	}
}

function mainPage() {
	
	var count = 0;
	function getCards (listId) {
		$.getJSON(basePath + "lists/" + listId + "/cards?key=" + appkey + "&token=" + token, {}, function(ret) {
			checkMembers(ret, listId);
			fillHTML('#' + listId, listId, ret);
			$('#count-' + listId).html(ret.length);
			count++;
		});
	}

	getCards(toDoList);
	getCards(doingList);
	getCards(doneList);
	getCards(backlogList);
	
	var intervalFetch = setInterval(function() {
	
		if(count === 4) {

			clearInterval(intervalFetch);

			for(var i = 0; i < members.length; i++) {
				var div = document.createElement('div');
				
				div.innerHTML = "<h3>" + members[i].name + "</h3>";
				
				var ul = document.createElement("ul");
				
				addLiToUl(ul, members[i].task[toDoList] + " tarefas em aberto");
				addLiToUl(ul, members[i].task[doingList] + " tarefas em execução");
				addLiToUl(ul, members[i].task[doneList] + " tarefas aguardando revisão");
				addLiToUl(ul, members[i].task[backlogList] + " sem prioridade");
				
				div.appendChild(ul);
				
				$('#resumo-tarefas').append(div);
			}
		
		}
	
	}, 500);
}

function report (nDays) {
	
	var date = new Date();
	
	var count = 0;
	function getCards (listId) {
		$.getJSON(basePath + "lists/" + listId + "/cards/closed?key=" + appkey + "&token=" + token, {}, function(ret) {
			checkMembers(ret, listId);
			
			var result = [];
			
			for(var i = 0; i < ret.length; i++) {
				var d = new Date(ret[i].dateLastActivity);
				var diff = (date - d) / (1000 * 3600 * 24);
				if(diff <= nDays) {
					result.unshift(ret[i]);
				}
			}
			
			fillHTML('#' + listId, listId, result);
			$('#count-' + listId).html(result.length);
			count++;
		});
	}

	getCards(doneList);
	
	var intervalFetch = setInterval(function() {
	
		if(count === 4) {

			clearInterval(intervalFetch);

			for(var i = 0; i < members.length; i++) {
				var div = document.createElement('div');
				
				div.innerHTML = "<h3>" + members[i].name + "</h3>";
				
				var ul = document.createElement("ul");
				
				addLiToUl(ul, members[i].task[toDoList] + " tarefas em aberto");
				addLiToUl(ul, members[i].task[doingList] + " tarefas em execução");
				addLiToUl(ul, members[i].task[doneList] + " tarefas aguardando revisão");
				addLiToUl(ul, members[i].task[backlogList] + " sem prioridade");
				
				div.appendChild(ul);
				
				$('#resumo-tarefas').append(div);
			}
		
		}
	
	}, 500);
}