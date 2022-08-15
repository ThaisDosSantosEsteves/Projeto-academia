from pydantic import BaseModel

from domain.creditCard import CreditCard


class CreditCardInput(BaseModel):
    number: str
    expiration: str
    cvv: str


    def toCreditCard(self):
        return CreditCard(self.number, self.cvv,
                   self.expiration)