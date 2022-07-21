from pydantic import BaseModel

from cartaoCredito import cartaoCredito

class cliente(BaseModel):
    nome: str
    cpf: str
    dataNascimento: str
    email: str
    cartaoDeCredito: cartaoCredito




