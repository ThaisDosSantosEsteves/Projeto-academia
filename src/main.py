from fastapi import FastAPI
from infoClientes import cliente
from alteracaoCliente import alteracaoCliente

caracteresEspeciais = ['`', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '{', '[', '}', '}', '|',
              '\\', ':', ';', '"', '\'', '<', ',', '>', '.', '?', '/']

app = FastAPI()
listaClientes = list()
@app.get("/")
async def root():
    return listaClientes


@app.post("/create")
async def criarCliente(novoCliente:cliente):
    tamanhoCpf = 11
    cpfValido = novoCliente.cpf.isdigit()
    numeroCartaoValido = novoCliente.cartaoDeCredito.numero.isdigit()
    cvvValido = novoCliente.cartaoDeCredito.cvv.isdigit()




    if len(novoCliente.cpf) != tamanhoCpf or not cpfValido:
        print("Erro no CPF!")
        return "ERRO! CPF inválido."

    for caracteres in caracteresEspeciais:
        if caracteres in novoCliente.nome:
            print('Erro no nome.')
            return "ERRO! Nome inválido."

    if '@' not in novoCliente.email or '.com' not in novoCliente.email:
        print("Erro no email.")
        return "ERRO! Email inválido"

    if not numeroCartaoValido:
        print("Erro no número do cartão.")
        return "ERRO! Número do cartao inválido."

    if not cvvValido:
        print("Erro no CVV do cartão.")
        return "ERRO! CVV do cartao inválido."




    listaClientes.append(novoCliente)
    return novoCliente


@app.put("/change")
async def alterarCliente(identificacaoCliente:alteracaoCliente):

    for dados in listaClientes:
        if identificacaoCliente.identificadorCpf == dados.cpf:
            print("Achou o cliente")
            return "Achou"



