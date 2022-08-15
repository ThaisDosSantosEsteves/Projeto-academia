from Backend.src.api.inputs.clientInput import ClientInput
from Backend.src.application import dataValidator
from fastapi import APIRouter

router = APIRouter()

@router.post("/create")
async def createClient(client:ClientInput):

    if not dataValidator.creditCardNumberValidator(client):
        print("numero de cartao invalido")
        return "ERRO! Número do cartão inválido."

    if not dataValidator.expirationValidator(client.creditcard.expiration):
        print("expiration inválida.")
        return "ERRO! Expiration inválida."

    if not dataValidator.creditCardCvvValidator(client.creditcard.cvv):
        print("cvv invalido")
        return "ERRO! CVV inválido."

    if not dataValidator.documentValidator(client.document):
        print("erro no cpf")
        return "ERRO! Cpf inválido."

    if not dataValidator.nameValidator(client.name):
        print("nome invalido")
        return "ERRO! Nome inválido."

    if not dataValidator.emailValidator(client.email):
        print("email invalido")
        return "ERRO! Email inválido."

    if not dataValidator.dateValidator(client.birthDate):
        print("data de nascimento inválida")
        return "ERRO! Data de nascimento inválida."



    database.createClient(client.toClient())
