

caracteresEspeciais = ['`', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '{', '[', '}', '}', '|',
              '\\', ':', ';', '"', '\'', '<', ',', '>', '.', '?', '/']
tamanhoCpf = 11
tamanhoCvvCartao = 3
tamanhoNumeroCartao = 16

def validarNome(nomeCliente):
    for caracteres in caracteresEspeciais:
        if caracteres in nomeCliente:
            print('Erro no nome.')
            return False
    return True

def validarCpf(cpfCliente):
    cpfValido = cpfCliente.isdigit()
    if len(cpfCliente) != tamanhoCpf or not cpfValido:
        print("Erro no CPF!")
        return False
    return True

def validarCadastroCpf(lista, idCliente):
    for dados in lista:
        if dados.cpf == idCliente:
            return False
    return True

def validarCadastroCpfEmail(lista, idCliente):
    for dados in lista:
        if dados.email == idCliente:
            return False
    return True

def validarEmail(emailCliente):
    if '@' not in emailCliente or '.com' not in emailCliente:
        print("Erro no email.")
        return False
    return True

def validarNumeroCartao(numeroCartao):
    numeroCartaoValido = numeroCartao.isdigit()
    if not numeroCartaoValido or len(numeroCartao) != tamanhoNumeroCartao:
        print("Erro no número do cartão.")
        return False
    return True

def validarCvvCartao(cvvCartao):
    cvvValido = cvvCartao.isdigit()
    if not cvvValido or len(cvvCartao) != tamanhoCvvCartao:
        print("Erro no CVV do cartão.")
        return False
    return True













