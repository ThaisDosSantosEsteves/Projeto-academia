from infrastructure.database import Database
from fastapi import APIRouter

router = APIRouter()
database = Database()


@router.get("/clients")
async def getAllClients():
    return database.getAllClients()
