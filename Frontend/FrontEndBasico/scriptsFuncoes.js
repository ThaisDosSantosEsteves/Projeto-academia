// CADASTRAR



class Validator {
    constructor(){
        this.validations = [
            'data-required',
            'data-only-letters',
            'data-only-numbers',
            'data-email-validate',
            'data-min-length',
            'data-max-length',
            
            

        ]
    }

    validate(form) {

        let currentValidations = document.querySelectorAll('form .error-validation');

        if(currentValidations.length > 0){
            this.cleanValidations(currentValidations);
        }

        let inputs = form.getElementsByTagName('input');
        console.log(inputs)
        let success = false
        let inputsArray = [...inputs];

        inputsArray.forEach(function(input){
            for(let i = 0; this.validations.length > i; i++) {
                if(input.getAttribute(this.validations[i]) != null){
                    
                    let method = this.validations[i].replace("data-", "").replace("-", "");
                    let value = input.getAttribute(this.validations[i]);

                    success = this[method](input, value);
                }
            }

        },this);


        let obj = {
            "nome": inputs['nome'].value,
            "cpf": inputs["cpf"].value,
            "dataNascimento": inputs["DataNascimento"].value,
            "email": inputs["email"].value,
            "cartaoDeCredito": {
                "numero": inputs["numeroCartao"].value,
                "vencimento": inputs["vencimento"].value,
                "cvv": inputs["cvv"].value
            }
            
        }
        console.log(obj)
        console.log(success)

        if (success){
            postData(obj)
        }
        
        
    }

    minlength(input, minValue){
        let inputLength = input.value.length;
        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;
        
        if(inputLength < minValue){
            this.printMessage(input, errorMessage);
            return false
        }

        return true
    }

    maxlength(input, maxValue){
        let inputLength = input.value.length;
        let errorMessage = `O campo precisa ter ${maxValue} caracteres`;
        if(inputLength > maxValue){
            this.printMessage(input, errorMessage);
            return false
        }
        return true
    }

    emailvalidate(input) {
        let re = /\S+@\S+\.\S+/;
        let email = input.value;
        let errorMessage = `Insira um e-mail no padrão exemplo@email.com`;
        if(!re.test(email)) {
          this.printMessage(input, errorMessage);
            return false
        }
        return true
    
      }

    onlyletters(input) {
        let re = /^[A-Za-z]+$/;;
        let inputValue = input.value;
        let errorMessage = `Este campo não aceita números nem caracteres especiais`;
        if(!re.test(inputValue)) {
          this.printMessage(input, errorMessage);
          return false
        }
        return true
    
      }    
    
    onlynumbers(input) {
        let re = /^[0-9]+$/;;
        let inputValue = input.value;
        let errorMessage = `Este campo não aceita letras nem caracteres especiais`;
        if(!re.test(inputValue)) {
          this.printMessage(input, errorMessage);
            return false
        }
        return true
      }


    printMessage(input, msg){
        let errorsQty = input.parentNode.querySelector('.error-validation');
        if(errorsQty === null){
            let template = document.querySelector('.error-validation').cloneNode(true);
        template.textContent = msg;
        let inputParent = input.parentNode;
        template.classList.remove('template');
        inputParent.appendChild(template);
        }
    }

    required(input){
        let inputValue = input.value;
        if(inputValue ===''){
            let errorMessage = `Este campo é obrigatório`;
            this.printMessage(input, errorMessage);
            return false
        }
        return true
    }

    cleanValidations(validations){
        validations.forEach(el => el.remove());
    }
}

let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

let validator = new Validator();

//Evento que dispara as validações
submit.addEventListener('click', function(e) {
    e.preventDefault();

    validator.validate(form);



})


async function postData (data) {
    
  
    const response = await fetch("http://127.0.0.1:8000/create", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
  
    if (!response.ok) {
      throw new Error(`Request failed with status ${reponse.status}`)
    }
    console.log("Request successful!")
  }




  // ALTERAR

  let formChange = document.querySelector(".search-box");
  let search = document.querySelector(".search-txt");
  let searchBtn = document.querySelector(".btn-search")

  searchBtn.addEventListener("click", function(){
    if(search.value.length > 0){
        window.location = "https://www.google.com.br/search?q=" + search.value; //botar onde pesquisar
        search.value = "";
    }else {
        form.classList.toggle("actived")
    }

  });

 


  /*let obj = {
    "identificadorCpf":  inputsChange['idCpf'].value,
    "novoNome": "thaisinha",
    "novoCpf": "17366848731",
    "novaDataNascimento": "21-12-1909",
    "novoEmail": "thaisinha@gmail.com",
    "novoCartaoDeCredito": {
    "numero": "1728391728394726",
    "vencimento": "12/27",
    "cvv": "834"
  };*/
