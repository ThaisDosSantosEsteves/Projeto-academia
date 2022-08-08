from fastapi import FastAPI
from datetime import datetime
import re
from fastapi.middleware.cors import CORSMiddleware

from api.inputs.clientInput import ClientInput
from application import validacaoDeDados
from infrastructure.database import Database

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


format = "%d/%m/%Y"
pattern = "^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$"

database = Database()

@app.get("/clients")
async def getAllClients():
    return database.getAllClients()


@app.post("/create")
async def createClient(client:ClientInput):

    cpfValidado = validacaoDeDados.validarCpf(client.document)
    if not cpfValidado:
        print("erro no cpf")
        return "ERRO! Cpf inválido."

    nomeValidado = validacaoDeDados.validarNome(client.name)
    if not nomeValidado:
        print("nome invalido")
        return "ERRO! Nome inválido."

    emailValidado = validacaoDeDados.validarEmail(client.email)
    if not emailValidado:
        print("email invalido")
        return "ERRO! Email inválido."
    

    numeroCartaoValidado = validacaoDeDados.validarNumeroCartao(client.creditCardInput.number)
    if not numeroCartaoValidado:
        print("numero de cartao invalido")
        return "ERRO! Número do cartão inválido."

    cvvValidado = validacaoDeDados.validarCvvCartao(client.creditCardInput.cvv)
    if not cvvValidado:
        print("cvv invalido")
        return "ERRO! CVV inválido."

    result = re.match(pattern, client.creditCardInput.expiration)
    if not result:
        print("vencimento errado")
        return "Formato de Vencimento inválido."

    try:
        res = datetime.strptime(client.birthDate, format)
    except ValueError:
        print("data invalida")
        return "Formato de data inválida."
    database.createClient(client.toClient())


@app.put("/update")
async def updateClient(newClient:ClientInput):

    cpfValidado = validacaoDeDados.validarCpf(newClient.document)
    if not cpfValidado:
        return "ERRO! Cpf inválido."


    nomeValidado = validacaoDeDados.validarNome(newClient.name)
    if not nomeValidado:
        return "ERRO! Nome inválido."

    emailValidado = validacaoDeDados.validarEmail(newClient.email)
    if not emailValidado:
        return "ERRO! Email inválido."

    numeroCartaoValidado = validacaoDeDados.validarNumeroCartao(newClient.creditCardInput.number)
    if not numeroCartaoValidado:
        return "ERRO! Número do cartão inválido."

    cvvValidado = validacaoDeDados.validarCvvCartao(newClient.creditCardInput.cvv)
    if not cvvValidado:
        return "ERRO! CVV inválido."

    result = re.match(pattern, newClient.creditCardInput.expiration)
    if not result:
        return "Formato de Vencimento inválido."

    try:
        res = datetime.strptime(newClient.birthDate, format)
    except ValueError:
        return "Formato de data inválida."

    success = database.updateClient(newClient.document, newClient.toClient())
    if success:
        return "Dados atualizados."
    
    return "ERRO! Dados nao atualizados."


@app.get("/client/{cpf}")
async def getClient(cpf):

    client = database.getClient(cpf)
    if client != None:
        return client
    return "Cliente não cadastrado"


@app.delete("/client/{cpf}")
async def removeClient(cpf):

    success = database.removeClient(cpf)
    if success:
        return "Dados apagados"
    return "Cliente não cadastrado"





