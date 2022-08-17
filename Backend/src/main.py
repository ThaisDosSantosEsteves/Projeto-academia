from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.getAllClients.getAllClientsController import getAllClientsRouter
from api.getClient.getClientController import getClientRouter
from api.removeClient.removeClientController import removeClientRouter
from api.updateClient.updateClientController import updateClientRouter
from api.updateCreditCard.updateCreditCardController import updateCreditCardRouter
from api.createClient.createClientController import createClientRouter

app = FastAPI()
app.include_router(getAllClientsRouter)
app.include_router(getClientRouter)
app.include_router(removeClientRouter)
app.include_router(updateClientRouter)
app.include_router(updateCreditCardRouter)
app.include_router(createClientRouter)
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
