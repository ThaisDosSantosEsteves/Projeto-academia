from infrastructure.database import Database
from fastapi import APIRouter

router = APIRouter()
database = Database()


@router.get("/client/{document}")
async def getClient(document):

    client = database.getClient(document)
    if client != None:
        return client
    return "Cliente não cadastrado"

