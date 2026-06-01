# Chronos API

API backend de um gerenciador de tarefas no estilo Pomodoro, construída com **Express**, **Prisma** e **MySQL**.

---

## 📁 Estrutura de Pastas

```
chronos-api/
├── prisma/
│   └── schema.prisma       # Modelos do banco de dados
├── src/
│   ├── controllers/
│   │   ├── healthController.js
│   │   ├── settingsController.js
│   │   └── taskController.js
│   ├── routes/
│   │   └── index.js        # Todas as rotas da API
│   ├── prisma.js           # Instância do PrismaClient
│   └── server.js           # Entrada da aplicação
├── .env                    # Variáveis de ambiente (NÃO commitar)
├── .env.example            # Exemplo de variáveis
├── .gitignore
└── package.json
```

---

## ⚙️ Pré-requisitos

- Node.js instalado (v18 ou superior)
- MySQL instalado e rodando
- npm ou yarn

---

## 🚀 Como rodar o projeto

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar o banco de dados

Abra o arquivo `.env` e edite a linha `DATABASE_URL` com seus dados do MySQL:

```
DATABASE_URL="mysql://root:sua_senha@localhost:3306/chronos_db"
```

> Substitua `root` pelo seu usuário, `sua_senha` pela sua senha e `chronos_db` pelo nome do banco que deseja criar.

### 3. Criar o banco e as tabelas

```bash
npx prisma migrate dev --name init
```

> Isso cria o banco `chronos_db` (se não existir) e cria as tabelas automaticamente.

### 4. Gerar o Prisma Client

```bash
npx prisma generate
```

> Geralmente já é feito automaticamente no passo anterior, mas rode se houver erros.

### 5. Iniciar o servidor

```bash
npm run dev
```

O servidor vai rodar em: **http://localhost:3333**

---

## 🔗 Rotas da API

### Health
| Método | URL       | Descrição         |
|--------|-----------|-------------------|
| GET    | /health   | Verifica se a API está rodando |

**Resposta:** `{ "ok": true }`

---

### Settings
| Método | URL        | Descrição                        |
|--------|------------|----------------------------------|
| GET    | /settings  | Retorna as configurações atuais  |
| PUT    | /settings  | Atualiza as configurações        |

**Body do PUT (raw JSON):**
```json
{
  "workTime": 30,
  "shortBreakTime": 10,
  "longBreakTime": 20
}
```

---

### Tasks
| Método | URL                          | Descrição                    |
|--------|------------------------------|------------------------------|
| POST   | /tasks                       | Cria uma nova task           |
| GET    | /tasks                       | Lista todas as tasks         |
| DELETE | /tasks                       | Limpa o histórico            |
| PATCH  | /tasks/:taskId/complete      | Marca task como concluída    |
| PATCH  | /tasks/:taskId/interrupt     | Marca task como interrompida |

**Body do POST (raw JSON):**
```json
{
  "id": "{{$timestamp}}",
  "name": "Task via Postman",
  "duration": 30,
  "type": "workTime",
  "startDate": "{{$timestamp}}"
}
```

**Body do PATCH /complete:**
```json
{
  "completeDate": "{{$timestamp}}"
}
```

**Body do PATCH /interrupt:**
```json
{
  "interruptDate": "{{$timestamp}}"
}
```

---

## ❗ Erros comuns

| Erro | Causa | Solução |
|------|-------|---------|
| ECONNREFUSED | API não está rodando | Execute `npm run dev` |
| 400 em PUT/PATCH/POST | Payload inválido | Verifique os campos obrigatórios |
| 404 em PATCH task | taskId não existe | Crie a task antes de tentar atualizar |

---

## 🧪 Testando no Postman

1. Crie um **Environment** chamado `Chronos Local`
2. Adicione as variáveis:
   - `baseUrl` = `http://localhost:3333`
   - `taskId` = *(deixar vazio, será preenchido automaticamente)*
3. Na request **POST /tasks**, adicione o seguinte script na aba **Tests**:
```javascript
const json = pm.response.json();
pm.environment.set("taskId", json.id);
```
