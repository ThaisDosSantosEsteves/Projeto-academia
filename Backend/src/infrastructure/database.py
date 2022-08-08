import psycopg2
from psycopg2 import Error


class Database:
    def __init__(self):
        self.db = psycopg2.connect(user="postgres",
                                  host="127.0.0.1",
                                  port="5432",
                                  database="minhaAcademia")
        
    def getAllClients(self):
        query = """
        SELECT * FROM public."Client"
        """
        cursor = self.db.cursor()
        cursor.execute(query)
        clients = cursor.fetchall()
        return clients
    
    def createClient(self, client):
        query = """
        INSERT INTO public."Client" (
            name, document, "birthDate", email, "creditCardId"
        )
        VALUES (%s, %s, TO_DATE(%s, 'DD/MM/YYYY'), %s, 1 )
        """
        cursor = self.db.cursor()
        cursor.execute(query, (client.name, client.document, client.birthDate, client.email))
        self.db.commit()
        return True
    
    def updateClient(self, idClient, newClient):
        for client in self.listaClientes:
            if idClient == client.document:
                client.name = newClient.name
                client.document = newClient.document
                client.email = newClient.email
                client.birthdate = newClient.birthDate
                client.creditCard.number = newClient.creditCard.number
                client.creditCard.cvv = newClient.creditCard.cvv
                client.creditCard.expiration = newClient.creditCard.expiration
                return True
        return False
    
    def getClient(self, idClient):
        for client in self.listaClientes:
            if idClient == client.document:
                return client
        return None
    
    def removeClient(self, idClient):
        for client in self.listaClientes:
            if idClient == client.document:
                self.listaClientes.remove(client)
                return True
        return False
    
    