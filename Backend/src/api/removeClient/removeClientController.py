from fastapi import APIRouter

router = APIRouter()
database = Database()

@router.delete("/client/{document}")
async def removeClient(document):

    success = database.removeClient(document)
    if success:
        return "Dados apagados"
    return "Cliente não cadastrado"




