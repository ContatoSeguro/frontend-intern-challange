// Tab behaviour \/
$(function () {
	$('#myTab li:first-child a').tab('show');
})

function updateColor(){
	sheet = localStorage.getItem('stylesheet');
	if(sheet != undefined){
		$("#color").remove();
		$('head').append(sheet);
	}
}

function setColor(id){
	let sheet = `<link rel="stylesheet" href="css/color${id}.css" id="color">`;
	localStorage.setItem('stylesheet', sheet);
	this.updateColor();
}

$(document).ready(updateColor());

function displayInterns(){
	//retorna os estagiarios, caso existam, se não exibe html padrão
	var interns = this.getInterns();
	if(interns){
		var html;
		for(var i in interns){

			//Formata a data para DD/MM/AAAA
			if(interns[i].nasc != ""){
				nasc = interns[i].nasc.split("-");
				nasc = nasc[2]+"/"+nasc[1]+"/"+nasc[0];
			}else{
				nasc = interns[i].nasc;
			}

			//gera o html
			html += `
				<tr id="id${interns[i].id}">
					<th scope="row" id="idIn${interns[i].id}">${interns[i].id}</th>
					<td id="nome${interns[i].id}">${interns[i].nome}</td>
					<td id="email${interns[i].id}">${interns[i].email}</td>
					<td id="tel${interns[i].id}">${interns[i].tel}</td>
					<td id="nasc${interns[i].id}">${nasc}</td>
					<td id="cidade${interns[i].id}">${interns[i].cidade}</td>
					<td>
					<button type="button" data-toggle="modal" data-target="#exampleModal" class="btn btn-outline-primary" onclick="showEdit(${interns[i].id}, ${i})">Editar</button>
					<button class="btn btn-outline-danger" onclick="deleteIntern(${i})">Apagar</button>

					</td>
				</tr>
			`;
		}
	}else{
		html= `
			<tr>
				<th scope="row">0</th>
				<td>Sem Registros</td>
				<td>N/A</td>
				<td>N/A</td>
				<td>N/A</td>
				<td>N/A</td>
				<td>N/A</td>
			</tr>`;
	}
	$("#consulta").html(html);
}

//retorna o que estiver salvo, ou retorna falso
function getInterns(){
	if(!(localStorage.getItem('interns') === null)){
		return JSON.parse(localStorage.getItem('interns'));
	}else{
		return false;
	}
}

function addIntern(){
	//recupera dados salvos caso existentes
	var interns = this.getInterns();
	//Define o ID do estagiario
	if(!interns){
		id=0;
		interns=Array();
	}else{
		id=interns[interns.length-1].id;
		id++;
	}

	//Popula o objeto do estagiário
	var intern = Object.assign(
		{
			id: `${id}`,
			nome: `${$('#nome').val()}`,
			email: `${$('#email').val()}`,
			tel: `${$('#tel').val()}`,
			nasc: `${$('#nasc').val()}`,
			cidade: `${$('#cidade').val()}`
		});

	//adiciona o estagiario ao array, e salva no localStorage como JSON
	interns.push(intern);
	localStorage.setItem('interns', JSON.stringify(interns));
}

function deleteIntern(index){
	//confirma ação
	if(confirm("Tem certeza que deseja apagar?\n Não será possível reverter!")){
		interns=this.getInterns();
		interns.splice(index,1);
		//se for a ultima ocorrência, remove o localStorage
		if(interns.length>0){
			localStorage.setItem("interns", JSON.stringify(interns));
		}else{
			localStorage.removeItem("interns");
		}
		//Recarrega
		this.displayInterns();
	}
}

function showEdit(id, index){
	//Transforma os campos da tabela em entradas
	var interns= this.getInterns();

	//gera o HTML
	var html = `
		<form onsubmit='saveIntern(${index})' id="f${index}">
			<div id="nome${interns[index].id}"><input type="text" class="form-control px-2 my-2" id="nome" placeholder="Nome completo..." value="${interns[index].nome}" required></div>
			<div id="email${interns[index].id}"><input type="email" class="form-control px-2 my-2" id="email" aria-describedby="emailHelp" placeholder="email@dominio.tld" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$" title="Digite um email válido." value="${interns[index].email}" required></div>
			<div id="tel${interns[index].id}"><input type="text" class="form-control px-2 my-2" id="tel" placeholder="(099) 99999-9999" pattern='\\(?[0-9]{3}\\)?-?[0-9]{4}-?[0-9]{4,5}' title="Digite um número válido. (099-99999-9999)" value="${interns[index].tel}"></div>
			<div id="nasc${interns[index].id}"><input type="date" class="form-control px-2 my-2" id="nasc" placeholder="data de nasc" value="${interns[index].nasc}"></div>
			<div id="cidade${interns[index].id}"><input type="text" class="form-control px-2 my-2" id="cidade" placeholder="Cidade" value="${interns[index].cidade}"></div>
			<div class="d-flex">
				<input type="submit" class="btn btn-outline-primary col mx-2" value="Salvar" onclick"teste()";>
				<button type="button" class="btn btn-outline-primary col mx-2" data-dismiss="modal">Cancelar</button>
			</div>
		</form>`
	$("#editar").html(html);
}

function teste(){
	alert("uou");
}

function saveIntern(index){
	var interns = this.getInterns();
		Object.assign(
			interns[index],
			{
				nome: `${$('#nome').val()}`,
				email: `${$('#email').val()}`,
				tel: `${$('#tel').val()}`,
				nasc: `${$('#nasc').val()}`,
				cidade: `${$('#cidade').val()}`
			});
		localStorage.setItem('interns', JSON.stringify(interns));
		this.displayInterns();
}


this.displayInterns();