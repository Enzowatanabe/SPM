
  
// criação de dados para a tabela -----------------------------------------------------------

    document.getElementById("formItem").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita o envio do formulário

    // Obter os valores dos campos de entrada
    var nome = document.getElementById("nome").value;
    var descricao = document.getElementById("descricao").value;
    var valor = document.getElementById("valor").value;
    var dataVenda = document.getElementById("dataVenda").value;
    var mes = document.getElementById("mes").value;
    var sinal = document.getElementById("sinal").value;
    var status = document.getElementById("status").value;
    var primeiroPagamento = document.getElementById("primeiroPagamento").value;

    // Criar uma nova linha na tabela com os valores do formulário
    var tabela = document.getElementById("tabela");
    var novaLinha = tabela.insertRow(-1);
    var colunaNome = novaLinha.insertCell(0);
    var colunaDescricao = novaLinha.insertCell(1);
    var colunaValor = novaLinha.insertCell(2);
    var colunaDataVenda = novaLinha.insertCell(3);
    var colunaMes = novaLinha.insertCell(4);
    var colunaSinal = novaLinha.insertCell(5);
    var colunaStatus = novaLinha.insertCell(6);
    var colunaPrimeiroPagamento = novaLinha.insertCell(7);

    colunaNome.innerHTML = nome;
    colunaDescricao.innerHTML = descricao;
    colunaValor.innerHTML = valor;
    colunaDataVenda.innerHTML = dataVenda;
    colunaMes.innerHTML = mes;
    colunaSinal.innerHTML = sinal;
    colunaStatus.innerHTML = status;
    colunaPrimeiroPagamento.innerHTML = primeiroPagamento;

    // Limpar os campos do formulário
    document.getElementById("nome").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("dataVenda").value = "";
    document.getElementById("mes").value = "";
    document.getElementById("sinal").value = "";
    document.getElementById("status").value = "";
    document.getElementById("primeiroPagamento").value = "";
});

// função filtrar -----------------------------------------------------------------------
const limparfiltro = document.getElementById('limparfiltro')
const filtrarbotao = document.getElementById('botaofiltrar')
filtrarbotao.addEventListener('click', ()=>{
        const input = document.getElementById("filtro").value
        filtrar(input)
    })
    limparfiltro.addEventListener('click', ()=>{
        document.getElementById("filtro").value = ""
        filtrar("")
    })    

    const filtrar = (input)=>{
        var input, filtro, tabela, linhas, colunas, valorCelula;
        filtro = input.toUpperCase();
        tabela = document.getElementById("tabela");
        linhas = tabela.getElementsByTagName("tr");

        for (var i = 0; i < linhas.length; i++) {
            colunas = linhas[i].getElementsByTagName("td");
            for (var j = 0; j < colunas.length; j++) {
                valorCelula = colunas[j].innerText || colunas[j].textContent;
                if (valorCelula.toUpperCase().indexOf(filtro) > -1) {
                    linhas[i].style.display = "";
                    break;
                } else {
                    linhas[i].style.display = "none";
                }
            }
        }
    }

// var input, filtro, tabela, linhas, colunas, valorCelula;
        // input = document.getElementById("filtro");
        // filtro = input.value.toUpperCase();
        // tabela = document.getElementById("tabela");
        // linhas = tabela.getElementsByTagName("tr");
    
        // // Iterar sobre todas as linhas da tabela e ocultar aquelas que não correspondem à busca
        // for (var i = 0; i < linhas.length; i++) {
        //     colunas = linhas[i].getElementsByTagName("td");
        //     for (var j = 0; j < colunas.length; j++) {
        //         valorCelula = colunas[j].innerText || colunas[j].textContent;
        //         if (valorCelula.toUpperCase().indexOf(filtro) > -1) {
        //             linhas[i].style.display = "";
        //             break;
        //         } else {
        //             linhas[i].style.display = "none";
        //         }
        //     }
        // }



