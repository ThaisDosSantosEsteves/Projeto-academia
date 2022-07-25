

from pydantic import BaseModel

class cartaoCredito(BaseModel):
    numero: str
    vencimento: str
    cvv: str