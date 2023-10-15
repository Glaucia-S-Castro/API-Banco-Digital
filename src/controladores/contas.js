let { contas, id } = require('../bancosdedados/bancodedados')

const listarContasBancarias = (req, res) => {
    return res.json(contas)
}

const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

    const novaConta = {
        numero: id++,
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha: Number(senha)
        }
    }
    contas.push(novaConta)

    return res.status(201).json()
}

const atualizarUsuario = (req, res) => {
    let numeroConta = Number(req.params.numeroConta)

    if (isNaN(numeroConta)) {
        return res.status(400).json({ mensagem: 'Número de conta inválido!' })
    }

    const contaEncontrada = contas.find((conta) => {
        return conta.numero === numeroConta
    })

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: 'Conta não encontrada!' })
    }

    contaEncontrada.usuario = {
        nome: req.body.nome,
        cpf: req.body.cpf,
        data_nascimento: req.body.data_nascimento,
        telefone: req.body.telefone,
        email: req.body.email,
        senha: Number(req.body.senha)
    }
    return res.status(204).json()
}

const excluirConta = (req, res) => {
    let numeroConta = Number(req.params.numeroConta)

    const contaEncontrada = contas.find((conta) => {
        return conta.numero === numeroConta
    })

    const indice = contas.findIndex((conta) => {
        return conta.numero === numeroConta
    })

    if (contaEncontrada.saldo !== 0) {
        return res.status(403).json({ mensagem: "A conta só pode ser removida se o saldo for zero!" })
    } else {
        contas.splice(indice, 1)
    }

    return res.status(204).send()
}

module.exports = {
    listarContasBancarias,
    criarConta,
    atualizarUsuario,
    excluirConta,
}