from application import dataValidator
from fastapi import APIRouter

from api.updateCreditCard.input.updateCreditCardIpnut import UpdateCreditCardInput

from infrastructure.database import Database

router = APIRouter()
database = Database()
@router.put("/updateCreditCard/{document}")
async def updateCreditCard(document, newCreditCard: UpdateCreditCardInput):
    if not dataValidator.creditCardNumberValidator(newCreditCard.number):
        return "ERRO! Número do cartão inválido."

    if not dataValidator.creditCardCvvValidator(newCreditCard.cvv):
        return "ERRO! CVV inválido."

    if not dataValidator.expirationValidator(newCreditCard.expiration):
        return "ERRO! Expiration inválida."

    database.updateCreditCard()