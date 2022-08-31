from domain.creditCard import CreditCard
import json

class Client():
    name: str
    document: str
    birthDate: str
    email: str
    creditCard: CreditCard
    
    def __init__(self, name, document, birthDate, email, creditCard):
        self.name = name
        self.email = email
        self.birthDate = birthDate
        self.document = document
        self.creditCard = creditCard

