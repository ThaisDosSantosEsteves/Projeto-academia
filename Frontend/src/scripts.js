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
const onlyNumbers = /^[0-9]+$/;
const emailValidator = /\S+@\S+\.\S+/;
/* DATA FORMATADA
const dataFormatada = dataNascimento.value.replaceAll("-", "/")
*/

 



formCadastro.addEventListener('submit', (i) => {
    i.preventDefault()
    checkInputs()
});



function checkInputs(){
    validarNome(nome)
    validarCpf(cpf)
    validarEmail(email)
    validarNumeroCartao(numeroCartao)
    validarCvvCartao(cvvCartao)
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
function validarCpf(cpf){
    if(cpf.value === ''){
        errorValidation(cpf, 'Campo Obrigatório')

    } else if (!onlyNumbers.test(cpf.value.trim())){
        errorValidation(cpf, 'Este campo não aceita letras nem caracteres especiais')

    } else if (cpf.value.length < 11) {
        errorValidation(cpf, 'O CPF deve ter 11 caracteres')

    } else {
        successValidation(cpf)
    }
}
function validarEmail(email){
    if(email.value === ''){
        errorValidation(email, 'Campo Obrigatório')

    } else if (!emailValidator.test(email.value.trim()) ) {
        errorValidation(email, 'Insira um email no padrão exemplo@email.com')

    } else {
        successValidation(email)
    }
}
function validarNumeroCartao(numeroCartao){
    if(numeroCartao.value === ''){
        errorValidation(numeroCartao, 'Campo Obrigatório')

    } else if (!onlyNumbers.test(numeroCartao.value.trim())){
        errorValidation(numeroCartao, 'Este campo não aceita letras nem caracteres especiais')

    } else if (numeroCartao.value.length < 16){
        errorValidation(numeroCartao, 'Este campo deve ter 16 caracteres')

    }else if (numeroCartao.value.length > 16){
        errorValidation(numeroCartao, 'Este campo deve ter 16 caracteres')

    }else {
        successValidation(numeroCartao)
    }
}
function validarCvvCartao(cvvCartao){
    if(cvvCartao.value === ''){
        errorValidation(cvvCartao, 'Campo Obrigatório')

    } else if (!onlyNumbers.test(cvvCartao.value.trim())){
        errorValidation(cvvCartao, 'Este campo não aceita letras nem caracteres especiais')

    } else if (cvvCartao.value.length < 3){
        errorValidation(cvvCartao, 'Este campo deve ter 3 caracteres')

    } else if (cvvCartao.value.length > 3){
        errorValidation(cvvCartao, 'Este campo deve ter 3 caracteres')

    }else {
        successValidation(cvvCartao)
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

