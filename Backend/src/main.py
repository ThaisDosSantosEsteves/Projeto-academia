from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.getAllClients import getAllClientsController
from api.getClient import getClientController
from api.removeClient import removeClientController
from api.updateClient import updateClientController
from api.updateCreditCard import updateCreditCardController
from api.createClient import createClientController

app = FastAPI()
app.include_router(createClientController)
app.include_router(getClientController)
app.include_router(getAllClientsController)
app.include_router(removeClientController)
app.include_router(updateClientController)
app.include_router(updateCreditCardController)
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
