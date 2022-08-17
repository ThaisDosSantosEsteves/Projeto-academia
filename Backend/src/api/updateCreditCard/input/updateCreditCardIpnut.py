from pydantic import BaseModel

class UpdateCreditCardInput(BaseModel):
    number: str
    expiration: str
    cvv: str


