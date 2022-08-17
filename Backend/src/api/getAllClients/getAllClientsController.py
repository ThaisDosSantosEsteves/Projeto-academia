from infrastructure.database import Database
from fastapi import APIRouter

getAllClientsRouter = APIRouter()
database = Database()


@getAllClientsRouter.get("/clients")
async def getAllClients():
    return database.getAllClients()
