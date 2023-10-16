# 💰 API-BANCO DIGITAL 
## Desafio de Módulo API Cubos


  <p align="left">
Projeto backend em Java Script, trata-se uma API REST para atender as funcionalidades básicas de um Banco Digital.

O projeto foi baseado em um desafio de conclusão de módulo da Cubos Academy, tem carater educativo onde foi solicitado a construção de validações simples para uso do cliente simulando funcionalidades de cadastro de usuários e transações financeiras mais comuns.
  </p>


## 🛠️ Linguagens e Ferramentas

![Skills](https://skillicons.dev/icons?i=js,nodejs,express,vscode,git,github)

- JavaScript
- Node.js
- Pacotes NPM (Nodemon, Express, Date-fns)
- Vscode
- Insomnia
- Git
- GitHub

## 🪜 Fucionalidades do Projeto:

### Cadastros e alterações de contas:

- [x] Criação de conta;
  - [x] validação de preenchimento dos campos obrigatórios

- [x] Listagem de usuários existentes;
  - [x] validação de senha de acesso a lista;

- [x] Alteração total do usuário de uma conta; 
  - [x] validação de campos de cpf e e-mail ja existentes, com a finalidade de não haver duplicidades;

- [x] Exclusão de conta;

### Transações Financeiras: 

- [x] Depositos; 
  - [x] Com validação de preenchimento correto de campos exigidos;
  
- [x] Saques;
  - [x] validação de preenchimento correto de campos exigidos;
  - [x] verificação de saldo disonível da conta;
  - [x] validação de conta existente;
  - [x] validação de senha do usuário;

 - [x] Transferências entre contas existentes;
   - [x] validação de preenchimento correto de campos exigidos;
   - [x] verificação de saldo disonível da conta;
   - [x] validação de contas de destino e origem existentes;
   - [x] validação de senha do usuário;

 - [x] Consulta de Saldo;
   - [x] validação de conta existente;
   - [x] validação de senha do usuário;

 - [x] Extrato simplificado;
   - [x] validação de conta existente;
   - [x] validação de senha do usuário;



## 😉 Contribua com o projeto

- Realize o Fork
- Faça as modificações necessárias
- Realize a Pull Request (PR)

## Rodando o Projeto

```shell
# 1. Clone o projeto

git clone <git@github.com:Glaucia-S-Castro/API-Banco-Digital.git>

# 2. Instale as dependências

npm install express
npm install -D nodemon
npm install date-fns --save


# 3. Execute o backend

npm run backend


```

## 📌 Endpoints :

#### - POST /contas - Criar conta bancária

~~~~ 
//Exemplo de Requisição
{
    "nome": "Maria Andrade",
    "cpf": "00011122234",
    "data_nascimento": "2021-03-15",
    "telefone": "71999998888",
    "email": "andrade@unlook.com",
    "senha": "12345"
}
~~~~


#### - GET /contas?senha_banco=Cubos123Bank - Listar constas bancárias 


#### - PUT /contas/:numeroConta/usuario - Atualizar dados de usuário da conta bancária
~~~~
//Exemplo de Requisição
{
    "nome": "Maria Andrade",
    "cpf": "00011122234",
    "data_nascimento": "2021-03-15",
    "telefone": "71999998888",
    "email": "andrade@unlook.com",
    "senha": "12345"
}
~~~~

#### - DELETE /contas/:numeroConta - Excluir conta
#### - POST /transacoes/depositar - Depositar valor em uma conta
~~~~
//Exemplo de Requisição
{
	"numero_conta": "1",
	"valor": 1900
}
~~~~


#### - POST /transacoes/sacar - Sacar valor de uma conta
~~~
//Exemplo de Requisição
{
 "numero_conta": "1",
 "valor": 1900,
 "senha": "123456"
}
~~~

#### - POST /transacoes/transferir - Transferir valor entre contas existentes
~~~
//Exemplo de Requisição
{
	"numero_conta_origem": "1",
	"numero_conta_destino": "2",
	"valor": 200,
	"senha": "123456"
}
~~~


#### - GET /contas/saldo?numero_conta=123&senha=123 - Consultar saldo de uma conta

#### - GET /contas/extrato?numero_conta=123&senha=123 - Consultar extrato simplificadode uma conta.




# 🚀 Detalhes da construção e testes:

### Visão geral:

<img src="img/Visão geral dos arquivos  gif.gif">


### Estrutura das pastas do projeto:

<img src="img/Estrutura das pastas do projeto.png">


### Construindo as rotas:

<img src="img/Construindo as rotas.png">

### Arquivo Index:

<img src="img/Arquivo Index.png">

### Finalizando as rotas:

<img src="img/Construindo as rotas.png">


# 💻 Testes no Insomnia :

### Teste Insomnia - Criação de contas e listagem de contas existentes:

<img src="img/Teste insomnia - Criar contas e Listar contas existentes.gif">


### Teste Insomnia - Atualização de dados de usuário da conta e Exclusão de conta:

<img src="img/Teste insomnia - Atualizar usuário da conta e Excluir conta.gif">


### Teste Insomnia - Realização de Deposito e Saque:

<img src="img/Testes insomnia - Depositar e Sacar.gif">


### Teste Insomnia - Realização de Transferências entre contas:

<img src="img/Teste insomnia - Transferência entre contas.gif">


### Teste Insomnia - Consulta de Saldo e Extrato:

<img src="img/Teste insomnia - Consulta de saldo e extrato.gif">







 





## Autor:

### Glaucia Castro

