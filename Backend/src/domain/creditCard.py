
class CreditCard():
    number: str
    expiration: str
    cvv: str
    
    def __init__(self, number, cvv, expiration):
        self.number = number
        self.cvv = cvv
        self.expiration = expiration