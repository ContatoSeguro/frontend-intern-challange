function adicionar(){
var user = JSON.stringify({
  nome: $("#txtNome").val(),
  email: $("#txtEmail").val(),
  telefone: $("#txtTelefone").val(),
  data: $("#txtDataNascimento").val(),
  cidade: $("#txtCidade").val()
});
tbUsers.push(user);
localStorage.setItem("tbUsers", JSON.stringify(tbUsers));
alert('Cadastrado com Sucesso!');
return true;
}

function editar(){
  tbUsers[indiceSelecionado] = JSON.stringify({
    nome: $("#txtNome").val(),
    email: $("#txtEmail").val(),
    telefone: $("#txtTelefone").val(),
    data: $("#txtDataNascimento").val(),
    cidade: $("#txtCidade").val()
  });
  localStorage.setItem("tbUsers", JSON.stringify(tbUsers));
  alert("alterado com Sucesso!");
  operacao = "Add"; //volta pro default
  return true;
}

function excluir(){
  tbUsers.splice(indiceSelecionado, 1);
  localStorage.setItem("tbUsers",JSON.stringify(tbUsers));
  toastr.info("Exclusão feita com sucesso!");
  return true;
}

function listar(){
  $("#tblListar").html("");
  $("#tblListar").html(
    "<thead>"+
    "	<tr>"+
    "<th>#</th>"+
    "	<th scope='col'>Nome</th>"+
    "	<th  scope='col'>Email</th>"+
    "	<th scope='col'>Telefone</th>"+
    "	<th scope='col'>Data</th>"+
    "	<th  scope='col'>Cidade</th>"+
    "	</tr>"+
    "</thead>"+
    "<tbody  scope='row'>"+
    "</tbody>"
    );

   for(var i in tbUsers){
    var user = JSON.parse(tbUsers[i]);
      $("#tblListar tbody").append("<tr>"+
                   "	<td> <i class='far fa-edit btnEditar' alt='"+i+"'></i> <i class='fas fa-window-close btnExcluir'alt='"+i+"'></i></td>" +
                   "	<td>"+user.nome+"</td>" +
                   "	<td>"+user.email+"</td>" +
                   "	<td>"+user.telefone+"</td>" +
                   "	<td>"+user.data+"</td>" +
                    "	<td>"+user.cidade+"</td>" +
                     "</tr>");
   }
}
