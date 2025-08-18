# English Translation Refactoring Progress

## ✅ Completed
### Models
- [x] Projeto → Project (renamed file and properties)
- [x] Tarefa → Task (renamed file and properties)
- [x] Administrador → Administrator (renamed file and properties)
- [x] Sprint (updated properties to English)

### Repositories
- [x] projetoRepository → projectRepository (renamed and translated)
- [x] sprintRepository (translated methods and messages)

## 🚧 In Progress

### Repositories (Remaining)
- [ ] tarefaRepository → taskRepository
- [ ] administradorRepository → administratorRepository
- [ ] userRepository (update if needed)

### Services
- [ ] projetoService → projectService
- [ ] sprintService → sprintService
- [ ] tarefaService → taskService
- [ ] administradorService → administratorService
- [ ] userService (update if needed)

### Controllers
- [ ] projetoController → projectController
- [ ] sprintController → sprintController
- [ ] tarefaController → taskController
- [ ] administradorController → administratorController
- [ ] userController (update if needed)

### Routes
- [ ] projetoRoutes → projectRoutes
- [ ] sprintRoutes → sprintRoutes
- [ ] tarefaRoutes → taskRoutes
- [ ] administradorRoutes → administratorRoutes
- [ ] administradorExtendedRoutes → administratorExtendedRoutes
- [ ] userRoutes (update if needed)

### Configuration
- [ ] swagger.ts (update schemas and documentation)
- [ ] index.ts (update route imports)

## 📋 Translation Guidelines

### Database Fields
- `nome` → `name`
- `descricao` → `description`
- `dataInicio` → `startDate`
- `dataFim` → `endDate`
- `dataCriacao` → `createdAt`
- `dataConclusao` → `completedAt`
- `dataAtualizacao` → `updatedAt`
- `prazo` → `deadline`
- `criadorId` → `creatorId`
- `responsavelId` → `assigneeId`
- `projetoId` → `projectId`
- `sprintId` → `sprintId`
- `nivel` → `level`
- `permissoes` → `permissions`
- `ativo` → `active`

### Status Values (keeping existing)
- `"to do"`, `"in progress"`, `"done"`
- `"planning"`, `"in_progress"`, `"ended"`
- `"low"`, `"medium"`, `"high"`

### Access Levels
- `super` → `super`
- `moderador` → `moderator`
- `suporte` → `support`

### Error Messages
- Portuguese messages → English messages
- Maintain same error handling structure

## 🎯 Goals
1. Improve code readability and maintainability
2. Follow English naming conventions
3. Maintain database compatibility
4. Keep all existing functionality
5. Update documentation to English
