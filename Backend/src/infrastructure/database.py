import psycopg2
from psycopg2 import Error, errors

from domain.client import Client

from domain.creditCard import CreditCard
from psycopg2.errorcodes import UNIQUE_VIOLATION


class Database:
    def __init__(self):
        self.db = psycopg2.connect(user="postgres",
                                  host="127.0.0.1",
                                  port="5432",
                                  password="123",
                                  database="minhaAcademia")
        
    def getAllClients(self):
        query = """
        SELECT c.name, c.document, c."birthDate", c.email, cc.number, cc.cvv, cc.expiration
        FROM public."Client" as c
        JOIN public."CreditCard" as cc
        ON c."creditCardId" = cc.id
        """
        cursor = self.db.cursor()
        cursor.execute(query)
        clients = cursor.fetchall()
        clientsList = []
        for client in clients:
            newClient = Client(client[0], client[1], client[2], client[3],
                   CreditCard(client[4], client[5], client[6]))
            clientsList.append(newClient)
        return clientsList
    
    def createClient(self, client):
        query = """
        INSERT INTO public."CreditCard" (
        number, cvv, expiration
        )
        VALUES (%s, %s, %s); 
        INSERT INTO public."Client" (
        name, document, "birthDate", email, "creditCardId"
            )
        VALUES (%s, %s, TO_DATE(%s, 'DD/MM/YYYY'), %s, 
        currval(pg_get_serial_sequence('public."CreditCard"','id'))); 
        """
        try:
            cursor = self.db.cursor()
            cursor.execute(query, (client.creditCard.number, client.creditCard.cvv, client.creditCard.expiration,
                                   client.name, client.document, client.birthDate, client.email))
            self.db.commit()
        except errors.lookup(UNIQUE_VIOLATION):
            self.db.rollback()
            return False

        return True
    
    def updateClient(self, document, newClient):
        query = """
        UPDATE public."Client" 
        SET name = %s, document = %s, "birthDate" = %s,
        email = %s
        WHERE document = %s;
        """
        cursor = self.db.cursor()
        cursor.execute(query, (newClient.name, newClient.document, newClient.birthDate, newClient.email, document))
        self.db.commit()
        return True

    def updateCreditCard(self, document, newCreditCard):
        query = """
        UPDATE public."CreditCard" as cc
        SET number = %s, cvv = %s, expiration = %s
        FROM public."Client" as c
        WHERE cc.id = c."creditCardId" 
        AND c.document = %s
        """
        cursor = self.db.cursor()
        cursor.execute(query, (newCreditCard.number, newCreditCard.cvv, newCreditCard.expiration, document))
        self.db.commit()
        return True
    
    def getClient(self, document):
        query = """
        SELECT c.name, c.document, c."birthDate", c.email, cc.number, cc.cvv, cc.expiration
        FROM public."Client" as c
        JOIN public."CreditCard" as cc
        ON c."creditCardId" = cc.id
        WHERE "document" = %s
        """
        cursor = self.db.cursor()
        cursor.execute(query, (document,))
        client = cursor.fetchone()
        if client is not None:
            newClient = Client(client[0], client[1], client[2], client[3],
                               CreditCard(client[4], client[5], client[6]))
            return newClient
        return None

    def removeClient(self, document):
        query = """
        DELETE FROM public."CreditCard" 
        WHERE id IN (SELECT "creditCardId" FROM public."Client" 
        WHERE document = %s);
        """
        cursor = self.db.cursor()
        cursor.execute(query, (document,))
        self.db.commit()
        return True
