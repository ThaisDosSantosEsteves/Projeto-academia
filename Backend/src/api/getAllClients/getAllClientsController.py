from infrastructure.database import Database
from fastapi import APIRouter
from starlette.responses import JSONResponse
import json

getAllClientsRouter = APIRouter()
database = Database()


@getAllClientsRouter.get("/clients")
async def getAllClients():
    clientsList = database.getAllClients()
    return clientsList
