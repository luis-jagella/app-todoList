# Todo App

Bem-vindo ao **Todo App**, uma aplicação completa para gerenciamento de tarefas, composta por **backend em Java com Spring Boot** e **frontend mobile em React Native**.

O projeto surgiu como evolução do meu estudo com APIs RESTful e apps móveis, integrando conceitos de **Spring Boot, JPA, H2 Database e React Native**.

---

## Funcionalidades

### Backend
- Listar tarefas (GET `/tarefas`)
- Adicionar tarefa (POST `/tarefas`)
- Atualizar tarefa (PUT `/tarefas/{id}`)
- Marcar tarefa como concluída
- Remover tarefa (DELETE `/tarefas/{id}`)

### Frontend (React Native)
- Listagem dinâmica de tarefas
- Adição de novas tarefas
- Conclusão de tarefas (marcar como concluída)
- Interface simples para mobile

---

## Tecnologias Utilizadas

### Backend
- Java 17
- Spring Boot 3.5.6
- Spring Data JPA
- H2 Database (arquivo local)
- Maven

### Frontend
- React Native
- Axios
- Android Emulator / iOS Simulator

---

## Como Rodar

### Backend
1. Clone este repositório:

```bash
git clone https://github.com/seu-usuario/todo-app.git
```

2. Entre na pasta do backend:

```bash
cd todo-app/backend
```

3. Rode a aplicação via Maven:

```bash
mvn spring-boot:run
```

ou via IntelliJ abrindo `TodoApiApplication.java`.

A API estará disponível em: `http://localhost:8080`

### Frontend
1. Entre na pasta do app:

```bash
cd ../TodoApp
```

2. Instale as dependências:

```bash
npm install
```

3. Rode o app no Android Emulator:

```bash
npx react-native run-android
```

No iOS, seria:

```bash
npx react-native run-ios
```

> Lembre-se de que para o app Android acessar o backend local, usamos o IP `10.0.2.2`.

---

## Estrutura do Projeto

```
todo-app/
├─ backend/           # API Spring Boot
│  ├─ src/main/java/org/example/todo_api
│  │  ├─ controller
│  │  ├─ model
│  │  └─ repository
│  ├─ pom.xml
│  └─ README.md
├─ TodoApp/           # App React Native
│  ├─ App.tsx
│  ├─ package.json
│  └─ node_modules/
└─ README.md
```

---

## Observações

- Banco H2 do backend persiste em arquivo local (`./data/todo_db`) para testes rápidos.
- O frontend mobile se conecta ao backend via IP `10.0.2.2` no Android Emulator.
- Projeto feito para aprendizado e demonstração, facilmente adaptável a banco de dados real ou deploy em nuvem.

---

## Contato

- Desenvolvedor: **Luís Gabriel Pereira**
- LinkedIn: [Luís Gabriel Pereira Jagella](https://www.linkedin.com/in/lu%C3%ADs-gabriel-pereira-jagella-ab6ba8308/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app)

