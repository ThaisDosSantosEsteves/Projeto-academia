from infrastructure.database import Database
from fastapi import APIRouter
from starlette.responses import JSONResponse

getClientRouter = APIRouter()
database = Database()


@getClientRouter.get("/client/{document}")
async def getClient(document):

    client = database.getClient(document)
    if client != None:
        return client

    return JSONResponse(status_code=400, content={'message': "Cliente não cadastrado"})


