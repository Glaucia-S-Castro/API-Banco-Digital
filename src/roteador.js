const express = require('express')

const { validarSenhaUsuario, validarSenhaBanco, validarCamposObrigatorios, validarCPFeEmail, validarNumeroConta, validarCamposTransferência } = require('./intermediários')
const { listarContasBancarias, criarConta, atualizarUsuario, excluirConta } = require('./controladores/contas')
const { depositar, sacar, transferir, consultarSaldo, consultarExtrato } = require('./controladores/transacoes')

const rotas = express()
rotas.use(express.json())

rotas.get('/contas', validarSenhaBanco, listarContasBancarias)
rotas.post('/contas', validarCamposObrigatorios, validarCPFeEmail, criarConta)
rotas.put('/contas/:numeroConta/usuario', validarNumeroConta, validarCamposObrigatorios, validarCPFeEmail, atualizarUsuario)
rotas.delete('/contas/:numeroConta', validarNumeroConta, excluirConta)

rotas.get('/contas/saldo', validarNumeroConta, validarSenhaUsuario, consultarSaldo)
rotas.get('/contas/extrato', validarNumeroConta, validarSenhaUsuario, consultarExtrato)

rotas.post('/transacoes/depositar', validarNumeroConta, depositar)
rotas.post('/transacoes/sacar', validarNumeroConta, validarSenhaUsuario, sacar)
rotas.post('/transacoes/transferir', validarCamposTransferência, validarSenhaUsuario, transferir)

module.exports = rotas