from pydantic import BaseModel
from api.inputs.creditCardInput import CreditCardInput
from domain.client import Client
from domain.creditCard import CreditCard


class ClientInput(BaseModel):
    document: str
    name: str
    birthDate: str
    email: str
    creditCardInput: CreditCardInput
    
    def toClient(self):
        return Client(self.name, self.document, self.birthDate, self.email, 
                      CreditCard(self.creditCardInput.number, self.creditCardInput.cvv,
                                 self.creditCardInput.expiration))