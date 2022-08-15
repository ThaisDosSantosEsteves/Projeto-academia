import re
from datetime import datetime

caracteresEspeciais = ['`', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '{', '[', '}', '}', '|',
              '\\', ':', ';', '"', '\'', '<', ',', '>', '.', '?', '/']
tamanhoCpf = 11
tamanhoCvvCartao = 3
tamanhoNumeroCartao = 16
dateFormat = "%d/%m/%Y"
pattern = "^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$"

def nameValidator(nomeCliente):
    for caracteres in caracteresEspeciais:
        if caracteres in nomeCliente:
            print('Erro no nome.')
            return False
    return True

def documentValidator(cpfCliente):
    cpfValido = cpfCliente.isdigit()
    if len(cpfCliente) != tamanhoCpf or not cpfValido:
        print("Erro no CPF!")
        return False
    return True

def emailValidator(emailCliente):
    if '@' not in emailCliente or '.com' not in emailCliente:
        print("Erro no email.")
        return False
    return True

def creditCardNumberValidator(numeroCartao):
    numeroCartaoValido = numeroCartao.isdigit()
    if not numeroCartaoValido or len(numeroCartao) != tamanhoNumeroCartao:
        print("Erro no número do cartão.")
        return False
    return True

def creditCardCvvValidator(cvvCartao):
    cvvValido = cvvCartao.isdigit()
    if not cvvValido or len(cvvCartao) != tamanhoCvvCartao:
        print("Erro no CVV do cartão.")
        return False
    return True

def dateValidator(date):
    try:
        res = datetime.strptime(date, dateFormat)
    except ValueError:
        return False
    return True

def expirationValidator(expiration):
    result = re.match(pattern, expiration)
    if not result:
        return False
    return True













