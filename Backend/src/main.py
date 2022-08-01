from fastapi import FastAPI
from infoClientes import cliente
from alteracaoCliente import alteracaoCliente
from identificacaoInfosCiente import identificacaoInfosCliente
from datetime import datetime
import re
import validacaoDeDados
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

listaClientes = list()
format = "%d/%m/%Y"
pattern = "^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$"


@app.get("/showallclients")
async def mostrarClientes():
    return listaClientes


@app.post("/create")
async def criarCliente(novoCliente:cliente):
    print("entrou")
    print(novoCliente)

    cpfValidado = validacaoDeDados.validarCpf(novoCliente.cpf)
    if not cpfValidado:
        print("erro no cpf")
        return "ERRO! Cpf inválido."
    cadastroValidado = validacaoDeDados.validarCadastroCpf(listaClientes, novoCliente.cpf)
    if not cadastroValidado:
        print("cpf ja cadastrado")
        return "ERRO! Cpf já cadastrado"

    nomeValidado = validacaoDeDados.validarNome(novoCliente.nome)
    if not nomeValidado:
        print("nome invalido")
        return "ERRO! Nome inválido."

    emailValidado = validacaoDeDados.validarEmail(novoCliente.email)
    if not emailValidado:
        print("email invalido")
        return "ERRO! Email inválido."
    cadastroValidadoEmail = validacaoDeDados.validarCadastroCpfEmail(listaClientes, novoCliente.email)
    if not cadastroValidadoEmail:
        print("email ja cadastrado")
        return "ERRO! Email já cadastrado."

    numeroCartaoValidado = validacaoDeDados.validarNumeroCartao(novoCliente.cartaoDeCredito.numero)
    if not numeroCartaoValidado:
        print("numero de cartao invalido")
        return "ERRO! Número do cartão inválido."

    cvvValidado = validacaoDeDados.validarCvvCartao(novoCliente.cartaoDeCredito.cvv)
    if not cvvValidado:
        print("cvv invalido")
        return "ERRO! CVV inválido."

    result = re.match(pattern, novoCliente.cartaoDeCredito.vencimento)
    if not result:
        print("vencimento errado")
        return "Formato de Vencimento inválido."

    try:
        res = datetime.strptime(novoCliente.dataNascimento, format)
    except ValueError:
        print("data invalida")
        return "Formato de data inválida."
    print(novoCliente)
    listaClientes.append(novoCliente)
    return novoCliente


@app.put("/change")
async def alterarCliente(identificacaoCliente:alteracaoCliente):

    for dados in listaClientes:
        if identificacaoCliente.identificadorCpf == dados.cpf:
            print("Achou o cliente")

            cpfValidado = validacaoDeDados.validarCpf(identificacaoCliente.novoCpf)
            if not cpfValidado:
                return "ERRO! Cpf inválido."
            cadastroValidado = validacaoDeDados.validarCadastroCpf(listaClientes, identificacaoCliente.novoCpf)
            if not cadastroValidado:
                return "ERRO! Cpf já cadastrado"

            nomeValidado = validacaoDeDados.validarNome(identificacaoCliente.novoNome)
            if not nomeValidado:
                return "ERRO! Nome inválido."

            emailValidado = validacaoDeDados.validarEmail(identificacaoCliente.novoEmail)
            if not emailValidado:
                return "ERRO! Email inválido."
            cadastroValidadoEmail = validacaoDeDados.validarCadastroCpfEmail(listaClientes, identificacaoCliente.novoEmail)
            if not cadastroValidadoEmail:
                return "ERRO! Email já cadastrado."

            numeroCartaoValidado = validacaoDeDados.validarNumeroCartao(identificacaoCliente.novoCartaoDeCredito.numero)
            if not numeroCartaoValidado:
                return "ERRO! Número do cartão inválido."

            cvvValidado = validacaoDeDados.validarCvvCartao(identificacaoCliente.novoCartaoDeCredito.cvv)
            if not cvvValidado:
                return "ERRO! CVV inválido."

            result = re.match(pattern, identificacaoCliente.novoCartaoDeCredito.vencimento)
            if not result:
                return "Formato de Vencimento inválido."

            try:
                res = datetime.strptime(identificacaoCliente.novaDataNascimento, format)
            except ValueError:
                return "Formato de data inválida."

            dados.nome = identificacaoCliente.novoNome
            dados.cpf = identificacaoCliente.novoCpf
            dados.email = identificacaoCliente.novoEmail
            dados.dataNascimento = identificacaoCliente.novaDataNascimento
            dados.cartaoDeCredito.numero = identificacaoCliente.novoCartaoDeCredito.numero
            dados.cartaoDeCredito.cvv = identificacaoCliente.novoCartaoDeCredito.cvv
            dados.cartaoDeCredito.vencimento = identificacaoCliente.novoCartaoDeCredito.vencimento
            return "Achou"

    return "Cliente não cadastrado"


@app.get("/showclient/{cpf}")
async def mostrarCliente(cpf):

    for dados in listaClientes:
        if cpf == dados.cpf:
            return dados

    return "Cliente não cadastrado"


@app.delete("/removeclient")
async def removerCliente(identificacaoInfosCiente:identificacaoInfosCliente):

    for dados in listaClientes:
        if identificacaoInfosCiente.identificadorCpf == dados.cpf:
            listaClientes.remove(dados)
            return listaClientes

    return "Cliente não cadastrado"





