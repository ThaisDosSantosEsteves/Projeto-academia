from pydantic import BaseModel
from cartaoCredito import cartaoCredito

class alteracaoCliente(BaseModel):
    identificadorCpf: str
    novoNome: str
    novoCpf: str
    novaDataNascimento: str
    novoEmail: str
    novoCartaoDeCredito: cartaoCredito