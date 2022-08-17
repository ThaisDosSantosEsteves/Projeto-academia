from fastapi import APIRouter

from infrastructure.database import Database

removeClientRouter = APIRouter()
database = Database()

@removeClientRouter.delete("/client/{document}")
async def removeClient(document):

    success = database.removeClient(document)
    if success:
        return "Dados apagados"
    return "Cliente não cadastrado"




