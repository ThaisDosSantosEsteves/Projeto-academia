from application import dataValidator

from fastapi import APIRouter

from api.updateClient.input.updateClientInput import UpdateClientInput

from infrastructure.database import Database
from starlette.responses import JSONResponse

database = Database()
updateClientRouter = APIRouter()

@updateClientRouter.put("/updateClient/{document}")
async def updateClient(document, newClient: UpdateClientInput):
    if not dataValidator.documentValidator(newClient.document):
        return JSONResponse(status_code=400, content={'message': "ERRO! Cpf inválido."})

    if not dataValidator.nameValidator(newClient.name):
        return JSONResponse(status_code=400, content={'message': "ERRO! Nome inválido."})

    if not dataValidator.emailValidator(newClient.email):
        return JSONResponse(status_code=400, content={'message': "ERRO! Email inválido."})

    if not dataValidator.dateValidator(newClient.birthDate):
        return JSONResponse(status_code=400, content={'message': "ERRO! Data de nascimento inválida."})
    success = database.updateClient(document, newClient)

    if success:
        return JSONResponse(status_code=200, content={'message': "Dados atualizados."})
    return JSONResponse(status_code=400, content={'message': "ERRO! Dados não atualizados."})



