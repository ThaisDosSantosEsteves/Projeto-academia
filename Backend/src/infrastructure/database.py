import psycopg2
from psycopg2 import Error


class Database:
    def __init__(self):
        self.db = psycopg2.connect(user="postgres",
                                  host="127.0.0.1",
                                  port="5432",
                                  password="123",
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
        cursor = self.db.cursor()
        cursor.execute(query, (client.creditCard.number, client.creditCard.cvv, client.creditCard.expiration,
                               client.name, client.document, client.birthDate, client.email))
        self.db.commit()
        return True
    
    def updateClient(self, idClient, newClient):
        query = """
    
        UPDATE public."Client" 
        SET name = %s, document = %s, "birthDate" = %s,
        email = %s,
        WHERE "document" = %s
        
        
        """
        cursor = self.db.cursor()
        cursor.execute(query, (newClient.name, newClient.document, newClient.birthDate, newClient.email, idClient))
        self.db.commit()
        return True

    def updateCreditCard(self, newCreditCard):
        query = """
        
        UPDATE public."CreditCard" 
        SET number = %s, cvv = %s, expiration = %s
        

        """
        cursor = self.db.cursor()
        cursor.execute(query, (newCreditCard.number, newCreditCard.cvv, newCreditCard.expiration))
        self.db.commit()
        return True
    
    def getClient(self, idClient):
        query = """
        SELECT  * FROM public."Client" 
        WHERE "document" = %s
                """
        cursor = self.db.cursor()
        cursor.execute(query, (idClient,))
        client = cursor.fetchone()
        return client

    def removeClient(self, idClient):
        query = """
        DELETE from public."Client"
        WHERE "document" = %s
                """
        cursor = self.db.cursor()
        cursor.execute(query, (idClient))
        self.db.commit()
        return True
