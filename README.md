# API de Tarefas

## Descrição

Esta API permite gerenciar tarefas com operações CRUD (Criar, Ler, Atualizar e Excluir). Utiliza o framework Express para definir as rotas e a lógica de controle para interagir com o modelo de tarefas.

### Estrutura do Projeto

- **`src/`**: Pasta principal que contém todos os arquivos de código-fonte.

  - **`controllers/`**: Contém os controladores responsáveis pela lógica de controle e manipulação de dados para cada recurso da API.
    - **`commitmentController.js`**: Controlador para gerenciar compromissos.
    - **`notificationController.js`**: Controlador para gerenciar notificações.
    - **`taskController.js`**: Controlador para gerenciar tarefas.

  - **`models/`**: Contém os modelos que definem a estrutura e o comportamento dos dados para cada recurso.
    - **`commitmentModel.js`**: Modelo para compromissos.
    - **`notificationModel.js`**: Modelo para notificações.
    - **`taskModel.js`**: Modelo para tarefas.

  - **`routes/`**: Contém as definições de rotas da API para cada recurso.
    - **`commitment.routes.js`**: Rotas para compromissos.
    - **`notification.routes.js`**: Rotas para notificações.
    - **`task.routes.js`**: Rotas para tarefas.

- **`index.js`**: Arquivo principal do projeto que inicia o servidor e configura o aplicativo.

## Configuração

### Dependências

Certifique-se de que as seguintes dependências estejam instaladas:

* Express
* nodemon
* fake-indexedDB

Instale as dependências necessárias com:

```bash
npm run install
```

### Iniciar o Servidor

Para iniciar o servidor, execute:

```bash
npm run start
```

O servidor estará disponível em `http://localhost:3000` por padrão.

## Endpoints da API

### Tarefas

#### Adicionar Nova Tarefa

* **Endpoint:** `POST /tasks/add`
* **Descrição:** Adiciona uma nova tarefa.
* **Corpo da Solicitação:**

```json
{
    "title": "Título da Tarefa",
    "description": "Descrição da Tarefa",
    "dueDate": "Data de Vencimento"
  }
```

* **Resposta:**
  * **Código 201:** `{"message": "Task adicionanda com sucesso", "taskId": ID}`
  * **Código 500:** `{"error": "Mensagem de erro"}`

#### Obter Todas as Tarefas

* **Endpoint:** `GET /tasks/all`
* **Descrição:** Retorna todas as tarefas.
* **Resposta:**
  * **Código 200:** `[{"id": ID, "title": "Título", "description": "Descrição", "dueDate": "Data"}]`
  * **Código 500:** `{"error": "Mensagem de erro"}`

#### Atualizar Tarefa

* **Endpoint:** `PUT /tasks/update/:id`
* **Descrição:** Atualiza uma tarefa existente com base no ID fornecido.
* **Parâmetros da URL:**
  * `id` (ID da tarefa a ser atualizada)
* **Corpo da Solicitação:**

```json
{
    "title": "Novo Título",
    "description": "Nova Descrição",
    "dueDate": "Nova Data de Vencimento"
  }
```

* **Resposta:**
  * **Código 200:** `{"message": "Task atualizada com sucesso"}`
  * **Código 500:** `{"error": "Mensagem de erro"}`

#### Excluir Tarefa

* **Endpoint:** `DELETE /tasks/delete/:id`
* **Descrição:** Remove uma tarefa existente com base no ID fornecido.
* **Parâmetros da URL:**
  * `id` (ID da tarefa a ser excluída)
* **Resposta:**
  * **Código 200:** `{"message": "Task deletada com sucesso"}`
  * **Código 500:** `{"error": "Mensagem de erro"}`

## Exemplos de Solicitações

Aqui estão alguns exemplos de como fazer solicitações usando `curl`:

* **Adicionar uma Tarefa:**

```bash
curl -X POST http://localhost:3000/tasks/add -H "Content-Type: application/json" -d '{"title": "Nova Tarefa", "description": "Descrição da nova tarefa", "dueDate": "2024-07-30"}'
```

* **Obter Todas as Tarefas:**

```bash
curl -X GET http://localhost:3000/tasks/all
```

* **Atualizar uma Tarefa:**

```bash
curl -X PUT http://localhost:3000/tasks/update/1 -H "Content-Type: application/json" -d '{"title": "Tarefa Atualizada", "description": "Descrição atualizada", "dueDate": "2024-08-01"}'
```

* **Excluir uma Tarefa:**

```bash
curl -X DELETE http://localhost:3000/tasks/delete/1
```


## Contribuição

Se você deseja contribuir para este projeto, siga estas etapas:

1. Faça um fork do repositório.
2. Crie uma branch para suas alterações (`git checkout -b minha-mudanca`).
3. Faça suas alterações e commit (`git commit -am 'Adiciona minha mudança'`).
4. Envie a branch para o repositório remoto (`git push origin minha-mudanca`).
5. Abra um pull request.

## Licença

Este projeto está licenciado sob a [Licença GTP V3.0](./LICENSE).
