from infrastructure.database import Database
from fastapi import APIRouter

getClientRouter = APIRouter()
database = Database()


@getClientRouter.get("/client/{document}")
async def getClient(document):

    client = database.getClient(document)
    if client != None:
        return client
    return "Cliente não cadastrado"

