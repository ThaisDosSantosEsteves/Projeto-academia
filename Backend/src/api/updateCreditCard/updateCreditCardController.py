from application import dataValidator
from fastapi import APIRouter
from api.updateCreditCard.input.updateCreditCardIpnut import UpdateCreditCardInput
from infrastructure.database import Database
from starlette.responses import JSONResponse

updateCreditCardRouter = APIRouter()
database = Database()

@updateCreditCardRouter.put("/updateCreditCard/{document}")
async def updateCreditCard(document, newCreditCard: UpdateCreditCardInput):
    if not dataValidator.creditCardNumberValidator(newCreditCard.number):
        return JSONResponse(status_code=400, content={'message': "ERRO! Número do cartão inválido."})

    if not dataValidator.creditCardCvvValidator(newCreditCard.cvv):
        return JSONResponse(status_code=400, content={'message': "ERRO! CVV inválido."})

    if not dataValidator.expirationValidator(newCreditCard.expiration):
        return JSONResponse(status_code=400, content={'message': "ERRO! Expiration inválida."})

    database.updateCreditCard(document, newCreditCard)