const { depositos, contas, saques, transferencias } = require('../bancosdedados/bancodedados')
const { format } = require('date-fns')

const depositar = (req, res) => {
    const numero_conta = Number(req.body.numero_conta)
    let valor = Number(req.body.valor)

    if (isNaN(valor)) {
        return res.status(400).json({ mensagem: 'O número da conta e o valor são obrigatórios!' })
    }

    if (valor < 1) {
        return res.status(400).json({ mensagem: 'Valor inválido!' })
    }

    const contaEncontrada = contas.find((conta) => {
        return conta.numero === numero_conta
    })

    const novoDeposito = {
        data: format(new Date(), 'yyyy-dd-MM:HH:mm:ss'),
        numero_conta: contaEncontrada.numero,
        valor
    }
    depositos.push(novoDeposito)

    contaEncontrada.saldo += novoDeposito.valor

    return res.status(204).send()
}

const sacar = (req, res) => {
    const { numero_conta } = req.body
    const valor = Number(req.body.valor)

    if (!valor || valor < 1) {
        return res.status(400).json({ mensagem: "O valor não pode ser menor que zero!" })
    }

    const contaEncontrada = contas.find((conta) => {
        return conta.numero === Number(numero_conta)
    })

    const saldoDisponivel = contaEncontrada.saldo

    if (valor > saldoDisponivel) {
        return res.status(403).json({ mensagem: "Saldo insuficiente, não é possivel realizar o saque!" })
    }

    const novoSaque = {
        data: format(new Date(), 'yyyy-dd-MM:HH:mm:ss'),
        numero_conta: contaEncontrada.numero,
        valor
    }

    saques.push(novoSaque)
    contaEncontrada.saldo -= valor

    return res.status(204).json()
}

const transferir = (req, res) => {
    const numero_conta_origem = Number(req.body.numero_conta_origem)
    const numero_conta_destino = Number(req.body.numero_conta_destino)
    const valor = Number(req.body.valor)

    if (!numero_conta_origem || isNaN(numero_conta_origem)) {
        return res.status(400).json({ mensagem: "É obrigatório informar conta de origem válida! " })
    }
    if (!numero_conta_destino || isNaN(numero_conta_destino)) {
        return res.status(400).json({ mensagem: "É obrigatório informar conta de destino válida! " })
    }
    if (!valor || isNaN(valor) || valor > 1) {
        return res.status(400).json({ mensagem: "É obrigatório informar um valor válido! " })
    }

    const contaEncontradaOrigem = contas.find((conta) => {
        return conta.numero === numero_conta_origem
    })

    if (!contaEncontradaOrigem) {
        return res.status(404).json({ mensagem: 'Conta de origem não encontrada!' })
    }

    let saldoDisponivelOrigem = contaEncontradaOrigem.saldo

    if (valor > saldoDisponivelOrigem) {
        return res.status(403).json({ mensagem: "Saldo insuficiente!" })
    }

    const contaEncontradaDestino = contas.find((conta) => {
        return conta.numero === numero_conta_destino
    })

    if (!contaEncontradaDestino) {
        return res.status(404).json({ mensagem: 'Conta de destino não encontrada!' })
    }

    const novoTranferencia = {
        data: format(new Date(), 'yyyy-dd-MM:HH:mm:ss'),
        numero_conta_origem: contaEncontradaOrigem.numero,
        numero_conta_destino: contaEncontradaDestino.numero,
        valor
    }
    transferencias.push(novoTranferencia)
    contaEncontradaOrigem.saldo -= valor

    contaEncontradaDestino.saldo += valor

    return res.status(204).json()
}

const consultarSaldo = (req, res) => {
    const { numero_conta } = req.query

    const contaEncontrada = contas.find((conta) => {
        return conta.numero === Number(numero_conta)
    })

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: "Conta bancária não encontada!" })
    }

    return res.status(200).json({ saldo: contaEncontrada.saldo })
}

const consultarExtrato = (req, res) => {
    const numero_conta = Number(req.query.numero_conta)

    const contaEncontrada = contas.find((conta) => {
        return conta.numero === numero_conta
    })

    const depositosConta = depositos.filter((deposito) => {
        return deposito.numero_conta === contaEncontrada.numero
    })

    const saquesConta = saques.filter((saque) => {
        return saque.numero_conta === contaEncontrada.numero
    })

    const transferenciasEnviadas = transferencias.filter((transferencia) => {
        return transferencia.numero_conta_origem === contaEncontrada.numero
    })

    const transferenciasRecebidas = transferencias.filter((transferencia) => {
        return transferencia.numero_conta_destino === contaEncontrada.numero
    })

    return res.status(200).json({ depositosConta, saquesConta, transferenciasEnviadas, transferenciasRecebidas })
}

module.exports = {
    depositar,
    sacar,
    transferir,
    consultarSaldo,
    consultarExtrato

}