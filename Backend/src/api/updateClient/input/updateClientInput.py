from pydantic import BaseModel



class UpdateClientInput(BaseModel):
    document: str
    name: str
    birthDate: str
    email: str


