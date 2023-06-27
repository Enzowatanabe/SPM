document.addEventListener("DOMContentLoaded", function() {
    var comprasLink = document.querySelector(".compras");
    var itensCompras = document.querySelector(".itensCompras");
    var clientesLink = document.querySelector(".clientes");
    var itensClientes = document.querySelector('.itensClientes');
    var contasLink = document.querySelector(".contas");
    var itensContas = document.querySelector('.itensContas');
    var funcionariosLink = document.querySelector(".funcionarios");
    var itensfuncionarios = document.querySelector('.itensfuncionarios');
    

    funcionariosLink.addEventListener("click", function(event) {
        event.preventDefault();
        itensfuncionarios.classList.toggle("mostra");
    });
    
    contasLink.addEventListener("click", function(event) {
        event.preventDefault();
        itensContas.classList.toggle("mostra");
    });

    clientesLink.addEventListener("click", function(event) {
        event.preventDefault();
        itensClientes.classList.toggle("mostra");
    });

    comprasLink.addEventListener("click", function(event) {
        event.preventDefault();
        itensCompras.classList.toggle("mostra");
    });
});