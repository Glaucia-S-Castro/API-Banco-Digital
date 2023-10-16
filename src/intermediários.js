const { banco, contas } = require('./bancosdedados/bancodedados')

function validarSenhaBanco(req, res, next) {
    const { senha_banco } = req.query

    if (banco.senha !== senha_banco) {
        return res.status(401).json({ mensagem: "Obrigatório informar senha!" })
    }

    if (!senha_banco) {
        return res.status(401).json({ mensagem: "A senha do banco informada é inválida!" })
    }

    next()
}

function validarSenhaUsuario(req, res, next) {
    let senha = Number(req.query.senha)
    if (!req.query.senha) {
        senha = Number(req.body.senha)
    }
    if (!senha) {
        return res.status(401).json({ mensagem: "É obrigatório informar a senha da conta" })
    }

    let numeroConta = Number(req.query.numero_conta)
    if (!req.query.numero_conta) {
        numeroConta = Number(req.body.numero_conta)
        if (!req.body.numero_conta) {
            numeroConta = Number(req.body.numero_conta_origem)
        }
    }
    const contaEncontrada = contas.find((conta) => {
        return conta.numero === numeroConta
    })

    if (senha !== contaEncontrada.usuario.senha) {
        return res.status(401).json({ mensagem: "A senha da conta informada esta incorreta!" })
    }

    next()
}

function validarCamposObrigatorios(req, res, next) {
    const { nome, data_nascimento, telefone, email } = req.body
    const cpf = Number(req.body.cpf)
    const senha = Number(req.body.senha)


    if (!nome) {
        return res.status(400).json({ mensagem: 'O campo nome é obrigatório!' })
    }
    if (nome === "" || nome === " ") {
        return res.status(400).json({ mensagem: 'Favor inserir um nome válido!' })
    }

    if (!cpf) {
        return res.status(400).json({ mensagem: 'O campo cpf é obrigatório!' })
    }

    if (!data_nascimento) {
        return res.status(400).json({ mensagem: 'O campo data de nascimento é obrigatório!' })
    }
    if (!telefone) {
        return res.status(400).json({ mensagem: 'O campo telefone é obrigatório' })
    }

    if (!email) {
        return res.status(400).json({ mensagem: 'O campo e-mail é obrigatório' })
    }

    if (!senha) {
        return res.status(400).json({ mensagem: 'O campo senha é obrigatório' })
    }
    if (isNaN(senha)) {
        return res.status(400).json({ mensagem: 'O campo senha deve conter apenas numeros!' })
    }
    next()
}

function validarCPFeEmail(req, res, next) {
    const { cpf, email } = req.body

    if (cpf.length !== 11) {
        return res.status(400).json({ mensagem: 'CPF invalido, o campo CPF precisa conter 11 dígitos' })
    }
    const cpfExistente = contas.some((conta) => {
        return cpf === conta.usuario.cpf
    })
    const emailExistente = contas.some((conta) => {
        return email === conta.usuario.email
    })

    if (cpfExistente || emailExistente) {
        return res.status(400).json({ mensagem: 'Já existe uma conta com o cpf ou e-mail informado!' })
    }
    next()
}

function validarNumeroConta(req, res, next) {
    let numeroConta = Number(req.params.numeroConta)
    if (!req.params.numeroConta) {
        numeroConta = Number(req.query.numero_conta)
        if (!req.query.numero_conta) {
            numeroConta = Number(req.body.numero_conta)
        }
    }

    if (!numeroConta) {
        return res.status(400).json({ mensagem: 'O numero da conta é obrigatório!' })
    }

    if (isNaN(numeroConta)) {
        return res.status(400).json({ mensagem: 'Número de conta inválido!' })
    }

    const contaEncontrada = contas.find((conta) => {
        return conta.numero === numeroConta
    })

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: 'Conta não encontrada!' })
    }

    next()
}

function validarCamposTransferência(req, res, next) {
    const numero_conta_origem = Number(req.body.numero_conta_origem)
    const numero_conta_destino = Number(req.body.numero_conta_destino)
    const valor = Number(req.body.valor)

    if (!numero_conta_origem) {
        return res.status(400).json({ mensagem: "É obrigatório informar conta de origem válida! " })
    }
    if (isNaN(numero_conta_origem)) {
        return res.status(400).json({ mensagem: "É obrigatório informar conta de origem válida! " })
    }
    const contaEncontradaOrigem = contas.find((conta) => {
        return conta.numero === numero_conta_origem
    })
    if (!contaEncontradaOrigem) {
        return res.status(404).json({ mensagem: 'Conta de origem não encontrada!' })
    }

    if (!numero_conta_destino) {
        return res.status(400).json({ mensagem: "É obrigatório informar conta de destino válida! " })
    }
    if (isNaN(numero_conta_destino)) {
        return res.status(400).json({ mensagem: "É obrigatório informar conta de destino válida! " })
    }
    const contaEncontradaDestino = contas.find((conta) => {
        return conta.numero === numero_conta_destino
    })
    if (!contaEncontradaDestino) {
        return res.status(404).json({ mensagem: 'Conta de destino não encontrada!' })
    }

    if (contaEncontradaOrigem === contaEncontradaDestino) {
        return res.status(400).json({ mensagem: "Conta de origem e conta de destino não podem ser iguais! " })
    }

    if (!valor) {
        return res.status(400).json({ mensagem: "É obrigatório informar um valor válido! " })
    }
    if (isNaN(valor)) {
        return res.status(400).json({ mensagem: "É obrigatório informar um valor válido! " })
    }
    if (valor < 1) {
        return res.status(400).json({ mensagem: "É obrigatório informar um valor válido! " })
    }

    next()
}

module.exports = {
    validarSenhaBanco,
    validarSenhaUsuario,
    validarCamposObrigatorios,
    validarCPFeEmail,
    validarNumeroConta,
    validarCamposTransferência
}