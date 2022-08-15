from pydantic import BaseModel
from domain.client import Client
from inputs.creditCardInput import CreditCardInput
from domain.creditCard import CreditCard


class ClientInput(BaseModel):
    document: str
    name: str
    birthDate: str
    email: str
    creditcard: CreditCardInput

    
    def toClient(self):
        return Client(self.name, self.document, self.birthDate, self.email,
                      CreditCard(self.creditcard.number, self.creditcard.cvv, self.creditcard.expiration))