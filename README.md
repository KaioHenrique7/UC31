# 🚗 Sistema de Oficina Mecânica

Sistema web desenvolvido em Node.js, TypeScript e Express para gerenciamento de uma oficina mecânica.

O sistema permite cadastrar clientes, veículos, ordens de serviço e usuários, oferecendo uma interface web desenvolvida com EJS.

---

#  Funcionalidades

- Cadastro de Clientes
- Cadastro de Veículos
- Cadastro de Ordens de Serviço
- Cadastro de Usuários
- Login e Logout
- Autenticação utilizando Session
- Upload de imagens
- Persistência de dados em arquivos JSON
- Interface Web com EJS
- Validação dos formulários
- Testes automatizados com Jest

---

#  Equipe

| Nome | Função |
|-------|---------|
| Kaio Henrique Fernandes da Silva | Back-end |
| Integrante 2 | Front-end |
| Integrante 3 | QA/Testes |
| Integrante 4 | Líder Técnico |

---

#  Tecnologias

- Node.js
- TypeScript
- Express
- EJS
- CSS3
- JavaScript
- Express Session
- bcrypt
- Multer
- Jest
- Git
- GitHub

---

#  Estrutura do Projeto

```
UC31
│
├── dados
│
├── public
│   ├── css
│   ├── js
│   └── uploads
│
├── src
│   ├── entities
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── views
│   ├── app.ts
│   └── server.ts
│
├── package.json
├── tsconfig.json
└── README.md
```

---

#  Entidades

- Cliente
- Veículo
- Ordem de Serviço
- Usuário

---

#  Como executar

Clone o repositório

```bash
git clone https://github.com/SEU-USUARIO/UC31.git
```

Entre na pasta

```bash
cd UC31
```

Instale as dependências

```bash
npm install
```

Execute

```bash
npm run dev
```

O sistema ficará disponível em

```
http://localhost:3000
```

---

#  Testes

Executar testes

```bash
npm test
```

---

#  Rotas

## Clientes

| Método | Rota |
|---------|------|
| GET | /clientes |
| POST | /clientes |
| PUT | /clientes/:id |
| DELETE | /clientes/:id |

---

## Veículos

| Método | Rota |
|---------|------|
| GET | /veiculos |
| POST | /veiculos |
| PUT | /veiculos/:id |
| DELETE | /veiculos/:id |

---

## Ordens de Serviço

| Método | Rota |
|---------|------|
| GET | /ordens |
| POST | /ordens |
| PUT | /ordens/:id |
| DELETE | /ordens/:id |

---

## Usuários

| Método | Rota |
|---------|------|
| GET | /usuarios |
| POST | /usuarios |

---

## Autenticação

| Método | Rota |
|---------|------|
| POST | /auth/login |
| GET | /auth/logout |

---

#  Telas

- Login
- Página Inicial
- Clientes
- Veículos
- Ordens de Serviço
- Cadastro de Usuário

---

#  Persistência

Os dados são armazenados em arquivos JSON na pasta:

```
dados/
```

---

#  Segurança

- Senhas criptografadas com bcrypt.
- Sessões utilizando express-session.
- Middleware para proteger rotas.

---

#  Padrões Utilizados

- MVC
- Repository Pattern
- Programação Orientada a Objetos
- TypeScript
- Clean Code

---

# Projeto

Projeto desenvolvido para a Unidade Curricular UC31 – Codificar Back-end – SENAC/RN.

---

#  Licença

Projeto desenvolvido apenas para fins educacionais.