
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
function checkInputsAlterarCliente(){
    let validName = validarNome(novoNome)
    let validCpf = validarCpf(novoCpf)
    let validEmail = validarEmail(novoEmail)
    let validBirthdate = validarDataDeNascimento(novaDataNascimento)

    return validName && validCpf && validBirthdate  && validEmail 
}
function checkInputsAlterarCartao(){
    let validCardNumber = validarNumeroCartao(numeroCartao)
    let validCVV = validarCvvCartao(cvvCartao)
    let validExpiration = validarVencimentoCartao(vencimentoCartao)

    return validCVV && validExpiration && validCardNumber
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



// CADASTRO

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
    console.log("Request successful!")
}

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


// ALTERAR

const formAlterarCliente= document.getElementById("formAlterar")
const idCliente = document.getElementById("idCliente")
const btnPesquisar = document.getElementById("btn-pesquisar")
const novoNome = document.getElementById('alterar-nome');
const novoEmail = document.getElementById('alterar-email');
const novaDataNascimento = document.getElementById('alterar-data');
const novoCpf = document.getElementById('alterar-cpf');


formAlterarCliente.addEventListener('submit', (e) => {
    e.preventDefault()
    let sucesso = checkId(idCliente)
    if (sucesso){
        let sucessoAlterar = checkInputsAlterarCliente()
        if (sucessoAlterar){
            let dataAlterar = {
                "document": novoCpf.value,
                "name": novoNome.value,
                "birthDate": new Date(novaDataNascimento.value.replaceAll("-", "/")).toLocaleDateString("pt-BR"),
                "email": novoEmail.value
            }
            console.log(dataAlterar)
            updateClient(idCliente.value, dataAlterar)
        }
    }
    
});

async function updateClient (id, data) {
    
    const response = await fetch("http://127.0.0.1:8000/updateClient/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"},
      body: JSON.stringify(data)
      
    })
    .then((r) => r.json())
    .then((data) => payload = data)
    console.log("payload", payload)
    console.log("response", response)
}
                                                          





// REMOVER

const formRemoverCliente= document.getElementById("formRemover")
const idClienteRemove = document.getElementById("idClienteRemove")
const btnRemover = document.getElementById("btn-remover")

formRemoverCliente.addEventListener('submit', (e) => {
    e.preventDefault()
    let sucesso = checkId(idClienteRemove)
    if (sucesso){
        removeClient(idClienteRemove.value) 
    }
});

async function removeClient (id) {
    
    const response = await fetch("http://127.0.0.1:8000/client/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
  
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }
    console.log("Request successful!")
}


// MOSTRAR CLIENTE
const clientList = document.getElementById('clienteInfo');
const formMostrarCliente= document.getElementById("formCliente")
const idClienteInfo = document.getElementById("idClienteInfo")
const btnMostrarCliente = document.getElementById("btn-mostrarCliente")

async function getClient (id) {
    
    let response = await fetch("http://127.0.0.1:8000/client/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((r) => {
        if(!r.ok){
            let err = new Error("HTTP status code: " + r.status)
             err.response = r
             err.status = r.status
             throw err
        }
        return r.json()
    })
    console.log("response", response)

    let documentCliente = response["document"]
    let dataNascimento = response["birthDate"]
    let nome = response["name"]
    let email = response["email"]
    let creditCardCVV = response["creditCard"]["cvv"]
    let creditCardExpiration = response["creditCard"]["expiration"]
    let creditCardNumber = response["creditCard"]["number"]

    const container = document.createElement('ul');
	const mostrarNome = document.createElement('li');
    const mostrarEmail = document.createElement('li');
    const mostrarCpf = document.createElement('li');
    const mostrarData = document.createElement('li');
    const mostrarCvv = document.createElement('li');
    const mostrarNumero = document.createElement('li');
    const mostrarVencimento = document.createElement('li');
	const infoCpf = document.createTextNode('CPF: ' + documentCliente);
    const infoDataDeNascimento  = document.createTextNode('Data de Nascimento: ' + dataNascimento);
	const infoNome = document.createTextNode('Nome: ' + nome);
	const infoEmail = document.createTextNode('Email: ' + email);
	const infoCreditCardCvv = document.createTextNode('CVV: ' + creditCardCVV);
	const infoCreditCardExpiration = document.createTextNode('Vencimento: ' + creditCardExpiration);
	const infoCreditCardNumber = document.createTextNode('Número: ' + creditCardNumber);

    
	mostrarNome.setAttribute('for', nome);
    mostrarNome.appendChild(infoNome);
    
	mostrarCpf.setAttribute('for', documentCliente);
	mostrarCpf.appendChild(infoCpf);

    mostrarData.setAttribute('for', dataNascimento);
	mostrarData.appendChild(infoDataDeNascimento);

    mostrarEmail.setAttribute('for', email);
	mostrarEmail.appendChild(infoEmail);

    mostrarNumero.setAttribute('for', creditCardNumber);
	mostrarNumero.appendChild(infoCreditCardNumber);

    mostrarCvv.setAttribute('for', creditCardCVV);
	mostrarCvv.appendChild(infoCreditCardCvv);

    mostrarVencimento.setAttribute('for', creditCardExpiration);
	mostrarVencimento.appendChild(infoCreditCardExpiration);


	container.classList.add('info');
	container.appendChild(mostrarNome);
    container.appendChild(mostrarCpf);
    container.appendChild(mostrarEmail);
    container.appendChild(mostrarData);
    container.appendChild(mostrarNumero);
    container.appendChild(mostrarVencimento);
    container.appendChild(mostrarCvv);


	clientList.appendChild(container);
    

}
formMostrarCliente.addEventListener('submit', (e) => {
    e.preventDefault()
    let sucesso = checkId(idClienteInfo)
    if (sucesso){
        getClient(idClienteInfo.value) 
    }
});


// MOSTRAR TODOS OS CLIENTES

const AllClientsList = document.getElementById('todosOsClienteInfo');
const btnMostrarTodosClientes = document.getElementById("btn-mostrarTodosClientes")

async function getAllClients () {
  
    let response = await fetch("http://127.0.0.1:8000/clients", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((r) => {
        if(!r.ok){
            let err = new Error("HTTP status code: " + r.status)
             err.response = r
             err.status = r.status
             throw err
        }
        return r.json()
    })
    console.log("response", response)

    let documentCliente = response["document"]
    let dataNascimento = response["birthDate"]
    let nome = response["name"]
    let email = response["email"]
    let creditCardCVV = response["creditCard"]["cvv"]
    let creditCardExpiration = response["creditCard"]["expiration"]
    let creditCardNumber = response["creditCard"]["number"]

    const container = document.createElement('ul');
	const mostrarNome = document.createElement('li');
    const mostrarEmail = document.createElement('li');
    const mostrarCpf = document.createElement('li');
    const mostrarData = document.createElement('li');
    const mostrarCvv = document.createElement('li');
    const mostrarNumero = document.createElement('li');
    const mostrarVencimento = document.createElement('li');
	const infoCpf = document.createTextNode('CPF: ' + documentCliente);
    const infoDataDeNascimento  = document.createTextNode('Data de Nascimento: ' + dataNascimento);
	const infoNome = document.createTextNode('Nome: ' + nome);
	const infoEmail = document.createTextNode('Email: ' + email);
	const infoCreditCardCvv = document.createTextNode('CVV: ' + creditCardCVV);
	const infoCreditCardExpiration = document.createTextNode('Vencimento: ' + creditCardExpiration);
	const infoCreditCardNumber = document.createTextNode('Número: ' + creditCardNumber);

    
	mostrarNome.setAttribute('for', nome);
    mostrarNome.appendChild(infoNome);
    
	mostrarCpf.setAttribute('for', documentCliente);
	mostrarCpf.appendChild(infoCpf);

    mostrarData.setAttribute('for', dataNascimento);
	mostrarData.appendChild(infoDataDeNascimento);

    mostrarEmail.setAttribute('for', email);
	mostrarEmail.appendChild(infoEmail);

    mostrarNumero.setAttribute('for', creditCardNumber);
	mostrarNumero.appendChild(infoCreditCardNumber);

    mostrarCvv.setAttribute('for', creditCardCVV);
	mostrarCvv.appendChild(infoCreditCardCvv);

    mostrarVencimento.setAttribute('for', creditCardExpiration);
	mostrarVencimento.appendChild(infoCreditCardExpiration);


	container.classList.add('info');
	container.appendChild(mostrarNome);
    container.appendChild(mostrarCpf);
    container.appendChild(mostrarEmail);
    container.appendChild(mostrarData);
    container.appendChild(mostrarNumero);
    container.appendChild(mostrarVencimento);
    container.appendChild(mostrarCvv);


	clientList.appendChild(container);
    

}
  btnMostrarTodosClientes.addEventListener("click", function(){
    getAllClients() 
})
