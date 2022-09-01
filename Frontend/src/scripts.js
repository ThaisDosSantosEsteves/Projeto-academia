
const formCadastro = document.getElementById('cadastro-form');
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
const expiration = /^[0-9/]+$/;


// VALIDAÇÕES


function checkInputs(){
    let validName = validarNome(nome)
    let validCpf = validarCpf(cpf)
    let validEmail = validarEmail(email)
    let validCardNumber = validarNumeroCartao(numeroCartao)
    let validCVV = validarCvvCartao(cvvCartao)
    let validExpiration = validarVencimentoCartao(vencimentoCartao)
    let validBirthdate = validarDataDeNascimento(dataNascimento)

    return validName && validCVV && validCpf && validBirthdate && validExpiration && validEmail && validCardNumber
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
        return true
    } 
    return false

}
function validarCpf(cpf){
    if(cpf.value === ''){
        errorValidation(cpf, 'Campo Obrigatório')

    } else if (!onlyNumbers.test(cpf.value.trim())){
        errorValidation(cpf, 'Este campo não aceita letras nem caracteres especiais')

    } else if (cpf.value.length < 11) {
        errorValidation(cpf, 'O CPF deve ter 11 caracteres')

    } else if (cpf.value.length > 11) {
        errorValidation(cpf, 'O CPF deve ter 11 caracteres')

    }else {
        successValidation(cpf)
        return true
    }
    return false
}
function validarEmail(email){
    if(email.value === ''){
        errorValidation(email, 'Campo Obrigatório')

    } else if (!emailValidator.test(email.value.trim()) ) {
        errorValidation(email, 'Insira um email no padrão exemplo@email.com')

    } else {
        successValidation(email)
        return true
    }
    return false
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
        return true
    }
    return false
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
        return true
    }
    return false
}
function validarVencimentoCartao(vencimentoCartao){
    if(vencimentoCartao.value === ''){
        errorValidation(vencimentoCartao, 'Campo Obrigatório')

    } else if (!expiration.test(vencimentoCartao.value.trim())){
        errorValidation(vencimentoCartao, 'Este campo não aceita letras')

    } else if (vencimentoCartao.value.length < 5){
        errorValidation(vencimentoCartao, 'Escreva a data de vencimento no formato MM/AA')

    } else if (vencimentoCartao.value.length > 5){
        errorValidation(vencimentoCartao, 'Escreva a data de vencimento no formato MM/AA')

    }else {
        successValidation(vencimentoCartao)
        return true
    }
    return false
}
function validarDataDeNascimento(dataNascimento){

    if(dataNascimento.value === ''){
        errorValidation(dataNascimento, 'Campo Obrigatório')
        
    } else {
        successValidation(dataNascimento)
        return true
    }
    return false
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


// CADASTRO

formCadastro.addEventListener('submit', (i) => {
    i.preventDefault()
    let sucesso = checkInputs()
    if(sucesso){
        let data = {
            "document": cpf.value,
            "name": nome.value,
            "birthDate": new Date(dataNascimento.value.replaceAll("-", "/")).toLocaleDateString("pt-BR"),
            "email": email.value,
            "creditcard": {
                "number": numeroCartao.value,
                "cvv": cvvCartao.value,
                "expiration": vencimentoCartao.value
            }
            
        }
        console.log(data)
        createClient(data) 
    }
        
});



async function createClient (data) {
    
    const response = await fetch("http://127.0.0.1:8000/create", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
  
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }
    console.log("Request successful!")}




// ALTERAR


function checkId(input){
    if(input.value === ''){
        errorValidation(input, 'Campo Obrigatório')

    } else if (!onlyNumbers.test(input.value.trim())){
        errorValidation(input, 'Este campo não aceita letras nem caracteres especiais')

    } else if (input.value.length < 11) {
        errorValidation(input, 'O CPF deve ter 11 caracteres')

    } else if (input.value.length > 11) {
        errorValidation(input, 'O CPF deve ter 11 caracteres')

    }else {
        successValidation(input)
        return true
    }
    return false
}

const formAlterarCliente= document.getElementById("formAlterar")
const idCliente = document.getElementById("idCliente")
const btnPesquisar = document.getElementById("btn-pesquisar")

formAlterarCliente.addEventListener('submit', (e) => {
    e.preventDefault()
    checkId(idCliente)
});
                                                              // MUDAR 


btnPesquisar.addEventListener("click", function(){
    if (idCliente.value.length > 0){
         getClient(idCliente.value) //botar onde pesquisar
        idCliente.value = "";
    } else{
        formAlterarCliente.classList.toggle("actived")
    }
})



// REMOVER

const formRemoverCliente= document.getElementById("formRemover")
const idClienteRemove = document.getElementById("idClienteRemove")
const btnRemover = document.getElementById("btn-remover")

formRemoverCliente.addEventListener('submit', (e) => {
    e.preventDefault()
    checkId(idClienteRemove)
});



// MOSTRAR CLIENTE
const clientList = document.getElementById('clienteInfo');

async function getClient (id) {
    
    let payload = {}
    let response = await fetch("http://127.0.0.1:8000/client/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((r) => r.json())
    .then((data) => payload = data)
    console.log("payload", payload)
    console.log("response", response)

    let documentCliente = payload["document"]
    let dataNascimento = payload["birthDate"]
    let nome = payload["name"]
    let email  = payload["email"]
    let creditCardCVV = payload["creditCard"]["cvv"]
    let creditCardExpiration = payload["creditCard"]["expiration"]
    let creditCardNumber = payload["creditCard"]["number"]

    const container = document.createElement('ul');
	const novaInfo = document.createElement('li');
	const infoCpf = document.createTextNode('CPF: ' + documentCliente);
    const infoDataDeNascimento  = document.createTextNode('Data de Nascimento: ' + dataNascimento);
	const infoNome = document.createTextNode('Nome: ' + nome);
	const infoEmail = document.createTextNode('Email: ' + email);
	const infoCreditCardCvv = document.createTextNode('CVV: ' + creditCardCVV);
	const infoCreditCardNumber = document.createTextNode('Vencimento: ' + creditCardExpiration);
	const infoCreditCardExpiration = document.createTextNode('Número: ' + creditCardNumber);

    
	novaInfo.setAttribute('for', nome);
    novaInfo.appendChild(infoNome);
    
	novaInfo.setAttribute('for', documentCliente);
	novaInfo.appendChild(infoCpf);

    novaInfo.setAttribute('for', dataNascimento);
	novaInfo.appendChild(infoDataDeNascimento);

    novaInfo.setAttribute('for', email);
	novaInfo.appendChild(infoEmail);

    novaInfo.setAttribute('for', creditCardNumber);
	novaInfo.appendChild(infoCreditCardNumber);

    novaInfo.setAttribute('for', creditCardCVV);
	novaInfo.appendChild(infoCreditCardCvv);

    novaInfo.setAttribute('for', creditCardExpiration);
	novaInfo.appendChild(infoCreditCardExpiration);


	container.classList.add('info');
	container.appendChild(novaInfo);


	clientList.appendChild(container);
    

}


const formMostrarCliente= document.getElementById("formCliente")
const idClienteInfo = document.getElementById("idClienteInfo")
const btnMostrarCliente = document.getElementById("btn-mostrarCliente")

formMostrarCliente.addEventListener('submit', (e) => {
    e.preventDefault()
    let sucesso = checkId(idClienteInfo)
    if (sucesso){
        getClient(idClienteInfo.value) 
    }
});

/*btnMostrarCliente.addEventListener("click", function(){
    if (idClienteInfo.value.length > 0){
         getClient(idClienteInfo.value) 
        idClienteInfo.value = "";
    } else{
        formMostrarCliente.classList.toggle("actived")
    }
})*/






// MOSTRAR TODOS OS CLIENTES

const btnMostrarTodosClientes = document.getElementById("btn-mostrarTodosClientes")

async function getAllClients () {
  
    const response = await fetch("http://127.0.0.1:8000/clients/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
  
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }
    console.log("Request successful!")
    console.log(response.json())
  }

  btnMostrarTodosClientes.addEventListener("click", function(){
    getAllClients() 
})
