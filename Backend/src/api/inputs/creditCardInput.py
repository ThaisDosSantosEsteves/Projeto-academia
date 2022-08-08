from pydantic import BaseModel


class CreditCardInput(BaseModel):
    number: str
    expiration: str
    cvv: str