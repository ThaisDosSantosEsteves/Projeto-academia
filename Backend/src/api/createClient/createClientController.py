from starlette.responses import JSONResponse

from api.inputs.clientInput import ClientInput
from application import dataValidator
from fastapi import APIRouter
from infrastructure.database import Database

database = Database()
createClientRouter = APIRouter()

@createClientRouter.post("/create")
async def createClient(client:ClientInput):

    if not dataValidator.creditCardNumberValidator(client.creditcard.number):
        print("numero de cartao invalido")
        return JSONResponse(status_code=400, content={'message': "ERRO! Número do cartão inválido."})

    if not dataValidator.expirationValidator(client.creditcard.expiration):
        print("expiration inválida.")
        return JSONResponse(status_code=400, content={'message': "ERRO! Expiration inválida."})

    if not dataValidator.creditCardCvvValidator(client.creditcard.cvv):
        print("cvv invalido")
        return JSONResponse(status_code=400, content={'message': "ERRO! CVV inválido."})


    if not dataValidator.documentValidator(client.document):
        print("erro no cpf")
        return JSONResponse(status_code=400, content={'message': "ERRO! Cpf inválido."})

    if not dataValidator.nameValidator(client.name):
        print("nome invalido")
        return JSONResponse(status_code=400, content={'message': "ERRO! Nome inválido."})

    if not dataValidator.emailValidator(client.email):
        print("email invalido")
        return JSONResponse(status_code=400, content={'message': "ERRO! Email inválido."})

    if not dataValidator.dateValidator(client.birthDate):
        print("data de nascimento inválida")
        return JSONResponse(status_code=400, content={'message': "ERRO! Data de nascimento inválida."})


    database.createClient(client.toClient())
    return JSONResponse(status_code=200, content={'message': "Cliente cadastrado com sucesso."})