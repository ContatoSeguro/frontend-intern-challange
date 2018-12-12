  var operacao = "Add"; //define que tipo de operaçao sera feita(default = adicionar)
  var indiceSelecionado = -1; //indice de seleção
  var tbUsers = localStorage.getItem('tbUsers'); //recuperando todos os itens
  tbUsers = JSON.parse(tbUsers); //parse pro JSON de string
  if(tbUsers == null){//inicia um vetor vazio caso não há cadastros
    tbUsers = [];
}
$('#cadastroForm').submit(function(){
  if(typeof(Storage)!="undefine"){//IF Para testar funcionamento do web storage no navegador
    if(operacao == "Add"){
      return adicionar();
    }else{
      return editar();
    }
  }else{
    toastr.info("Sem Suporte a WebStorage, Algumas funcionalidades não funcionarão!");
  }
});
$("#tblListar").on("click", ".btnEditar", function(){
  operacao = "E";
  indiceSelecionado = parseInt($(this).attr("alt"));
  var user = JSON.parse(tbUsers[indiceSelecionado]);
  $("#txtNome").val(user.nome);
  $("#txtEmail").val(user.email);
  $("#txtTelefone").val(user.telefone);
  $("#txtDataNascimento").val(user.data);
  $("#txtCidade").val(user.cidade);
});

$("#tblListar").on("click", ".btnExcluir", function(){
  indiceSelecionado = parseInt($(this).attr("alt"));
  excluir();
  listar();
});
$(function(){
    if(localStorage.tbUsers){
        $('#select').removeClass('esconde');
        listar();
    }else{
      $('#select').addClass('mostra');
    }
});
