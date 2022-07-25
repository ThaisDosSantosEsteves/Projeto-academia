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

        let inputsArray = [...inputs];

        inputsArray.forEach(function(input){
            for(let i = 0; this.validations.length > i; i++) {
                if(input.getAttribute(this.validations[i]) != null){
                    
                    let method = this.validations[i].replace("data-", "").replace("-", "");
                    let value = input.getAttribute(this.validations[i]);

                    this[method](input, value);
                }
            }

        },this);
        

    }

    minlength(input, minValue){
        let inputLength = input.value.length;
        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;
        
        if(inputLength < minValue){
            this.printMessage(input, errorMessage);
        }
    }

    maxlength(input, maxValue){
        let inputLength = input.value.length;
        let errorMessage = `O campo precisa ter ${maxValue} caracteres`;
        if(inputLength > maxValue){
            this.printMessage(input, errorMessage);
        }
    }

    emailvalidate(input) {
        let re = /\S+@\S+\.\S+/;
        let email = input.value;
        let errorMessage = `Insira um e-mail no padrão exemplo@email.com`;
        if(!re.test(email)) {
          this.printMessage(input, errorMessage);
        }
    
      }

    onlyletters(input) {
        let re = /^[A-Za-z]+$/;;
        let inputValue = input.value;
        let errorMessage = `Este campo não aceita números nem caracteres especiais`;
        if(!re.test(inputValue)) {
          this.printMessage(input, errorMessage);
        }
    
      }    
    
    onlynumbers(input) {
        let re = /^[0-9]+$/;;
        let inputValue = input.value;
        let errorMessage = `Este campo não aceita letras nem caracteres especiais`;
        if(!re.test(inputValue)) {
          this.printMessage(input, errorMessage);
        }
    
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
        }
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
