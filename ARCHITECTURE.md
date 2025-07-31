# Arquitetura Controller-Service

Esta aplicação agora segue uma arquitetura em camadas com separação clara de responsabilidades:

## Estrutura das Camadas

### 1. **Routes** (`src/routes/`)

- **Responsabilidade**: Definir endpoints e rotear requisições
- **Arquivos**:
  - `userRoutes.ts` - Rotas para usuários
  - `projetoRoutes.ts` - Rotas para projetos
  - `index.ts` - Centralizador de todas as rotas

### 2. **Controllers** (`src/controllers/`)

- **Responsabilidade**: Receber requisições HTTP, validar entrada e retornar respostas
- **Arquivos**:
  - `userController.ts` - Lógica de controle para usuários
  - `projetoController.ts` - Lógica de controle para projetos

### 3. **Services** (`src/services/`)

- **Responsabilidade**: Lógica de negócio, validações e regras da aplicação
- **Arquivos**:
  - `userService.ts` - Regras de negócio para usuários
  - `projetoService.ts` - Regras de negócio para projetos

### 4. **Repository** (`src/repository/`)

- **Responsabilidade**: Acesso e manipulação de dados
- **Arquivos**:
  - `userRepository.ts` - Operações de banco para usuários
  - `projetoRepository.ts` - Operações de banco para projetos

### 5. **Models** (`src/models/`)

- **Responsabilidade**: Definição das entidades e estrutura do banco
- **Arquivos**:
  - `User.ts` - Modelo de usuário
  - `Projeto.ts` - Modelo de projeto

## Fluxo de Requisição

```
Request → Route → Controller → Service → Repository → Database
                     ↓
Response ← Route ← Controller ← Service ← Repository ← Database
```

## Endpoints da API

### Usuários

- `POST /api/users` - Criar usuário
- `GET /api/users` - Listar todos os usuários
- `GET /api/users/:id` - Obter usuário por ID
- `PUT /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Deletar usuário

### Projetos

- `POST /api/projetos` - Criar projeto
- `GET /api/projetos` - Listar todos os projetos
- `GET /api/projetos/:id` - Obter projeto por ID
- `PUT /api/projetos/:id` - Atualizar projeto
- `DELETE /api/projetos/:id` - Deletar projeto

## Validações Implementadas

### Usuários

- Nome obrigatório e não vazio
- Email obrigatório e formato válido
- Senha mínima de 6 caracteres

### Projetos

- Nome obrigatório e não vazio
- Descrição obrigatória e não vazia
- Data de início não pode ser posterior ao prazo
- Status deve ser: "to do", "in progress" ou "done"

##  Como usar

1. **Iniciar o servidor**:

   ```bash
   npm run dev
   ```

2. **Exemplos de requisições**:

   **Criar usuário**:

   ```bash
   curl -X POST http://localhost:3000/api/users \
     -H "Content-Type: application/json" \
     -d '{
       "name": "João Silva",
       "email": "joao@email.com",
       "password": "123456"
     }'
   ```

   **Criar projeto**:

   ```bash
   curl -X POST http://localhost:3000/api/projetos \
     -H "Content-Type: application/json" \
     -d '{
       "nome": "Projeto Teste",
       "descricao": "Descrição do projeto",
       "status": "to do",
       "dataInicio": "2025-01-01",
       "prazo": "2025-12-31",
       "criadorId": 1
     }'
   ```

## Benefícios da Arquitetura

1. **Separação de Responsabilidades**: Cada camada tem uma função específica
2. **Manutenibilidade**: Código mais organizado e fácil de manter
3. **Testabilidade**: Cada camada pode ser testada independentemente
4. **Escalabilidade**: Fácil adicionar novas funcionalidades
5. **Reutilização**: Services podem ser reutilizados em diferentes contextos
6. **Validação Centralizada**: Regras de negócio concentradas nos Services
