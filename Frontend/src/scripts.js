const formCadastro = document.getElementById('cadastro-form');

// FUNÇÃO QUE CADASTRA O CLIENTE EM UMA LISTA
/*formCadastro.addEventListener('submit', function criarCadastro(e){
    e.preventDefault();
    const criaNomeCliente = document.getElementById('registro-nome');
    const listaClientes = document.getElementById('lista-de-clientes'); // mudar para banco de dados
    listaClientes.insertAdjacentHTML('afterend', `<li>${criaNomeCliente.value}</li>`); // está adicionando na lista

});*/



// VALIDAÇÕES

const nome = document.getElementById('registro-nome');
const email = document.getElementById('registro-email');
const dataNascimento = document.getElementById('registro-data');
const cpf = document.getElementById('registro-cpf');
const numeroCartao = document.getElementById('registro-numero-cartao');
const vencimentoCartao = document.getElementById('registro-vencimento-cartao');
const cvvCartao = document.getElementById('registro-cvv-cartao');
const onlyLetters = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;

formCadastro.addEventListener('submit', (i) => {
    i.preventDefault()

    checkInputs()

});

function checkInputs(){
    const emailValue = email.value.trim()
    const dataNascimentoValue = dataNascimento.value.trim()
    const cpfValue = cpf.value.trim()
    const numeroCartaoValue = numeroCartao.value.trim()
    const vencimentoCartaoValue = vencimentoCartao.value.trim()
    const cvvCartaoValue = cvvCartao.value.trim()
    

    validarNome(nome)
    
    
}

function validarNome(nome){

    if(nome.value === ''){
        errorValidation(nome, 'Campo Obrigatório')

    } else if (nome.value.length < 4) {
        errorValidation(nome, 'Deve ter mais que 4 caracteres')

    } else if (!onlyLetters.test(nome.value.trim())){
        errorValidation(nome, 'Este campo não aceita números nem caracteres especiais')

    } else {
        successValidation(nome)
    }

}


function errorValidation(input, message){
    const formControl = input.parentElement;
    const small = formControl.querySelector('small')
    small.innerText = message
    formControl.className = 'form-control error'
    
}

function successValidation(input){
    const formControl = input.parentElement;
    const small = formControl.querySelector('small')
    small.innerText = " "
    formControl.className = 'form-control success'
}

