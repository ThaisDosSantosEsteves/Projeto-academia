from fastapi import APIRouter
from infrastructure.database import Database
from starlette.responses import JSONResponse

removeClientRouter = APIRouter()
database = Database()

@removeClientRouter.delete("/client/{document}")
async def removeClient(document):

    success = database.removeClient(document)
    if success:
        return JSONResponse(status_code=200, content={'message': "Cliente removido."})
    return JSONResponse(status_code=400, content={'message': "Cliente não cadastrado"})





