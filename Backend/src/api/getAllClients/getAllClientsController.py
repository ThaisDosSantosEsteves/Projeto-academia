from infrastructure.database import Database
from fastapi import APIRouter
from starlette.responses import JSONResponse

getAllClientsRouter = APIRouter()
database = Database()


@getAllClientsRouter.get("/clients")
async def getAllClients():
    clientsList = database.getAllClients()
    return JSONResponse(status_code=200, content=clientsList)