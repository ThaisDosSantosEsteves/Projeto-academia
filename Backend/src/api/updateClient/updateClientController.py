from application import dataValidator

from fastapi import APIRouter

from api.updateClient.input.updateClientInput import UpdateClientInput

from infrastructure.database import Database

database = Database()
updateClientRouter = APIRouter()

@updateClientRouter.put("/updateClient")
async def updateClient(newClient: UpdateClientInput):
    if not dataValidator.documentValidator(newClient.document):
        return "ERRO! Cpf inválido."

    if not dataValidator.nameValidator(newClient.name):
        return "ERRO! Nome inválido."

    if not dataValidator.emailValidator(newClient.email):
        return "ERRO! Email inválido."

    if not dataValidator.dateValidator(newClient.birthDate):
        return "ERRO! Data de nascimento inválida."

    success = database.updateClient(newClient.document, newClient.toClient())
    if success:
        return "Dados atualizados."

    return "ERRO! Dados nao atualizados."

