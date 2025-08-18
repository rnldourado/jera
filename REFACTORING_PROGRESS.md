# English Translation Refactoring Progr## 🚧 In Progress

### Configuration
- [x] swagger.ts (updated schemas and documentation)

## ✅ **REFACTORING COMPLETE - 100%**

All components have been successfully translated from Portuguese to English while maintaining full functionality and database compatibility.
## ✅ Completed
### Models
- [x] Projeto → Project (renamed file and properties)
- [x] Tarefa → Task (renamed file and properties)
- [x] Administrador → Administrator (renamed file and properties)
- [x] Sprint (updated properties to English)

### Repositories
- [x] projetoRepository → projectRepository (renamed and translated)
- [x] sprintRepository (translated methods and messages)
- [x] tarefaRepository → taskRepository (renamed and translated)
- [x] administradorRepository → administratorRepository (renamed and translated)
- [x] userRepository (already in English)

### Services
- [x] projetoService → projectService (renamed and translated)
- [x] sprintService (translated methods and DTOs)
- [x] tarefaService → taskService (renamed and translated)
- [x] administradorService → administratorService (renamed and translated)
- [x] userService (already in English)

### Controllers
- [x] projetoController → projectController (renamed and translated)
- [x] sprintController (translated methods and error messages)
- [x] tarefaController → taskController (renamed and translated)
- [x] administradorController → administratorController (renamed and translated)
- [x] userController (translated error messages)

### Routes
- [x] projetoRoutes → projectRoutes
- [x] tarefaRoutes → taskRoutes  
- [x] administradorRoutes → administratorRoutes
- [x] administradorExtendedRoutes → administratorExtendedRoutes
- [x] sprintRoutes (updated Swagger documentation)
- [x] userRoutes (already in English)
- [x] index.ts (updated route paths and imports)

## � In Progress

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
