package org.example.todo_api.service;

import org.example.todo_api.model.Task;
import org.example.todo_api.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository repository;

    public TaskService(TaskRepository repository) {
        this.repository = repository;
    }

    public List<Task> listarTarefas() {
        return repository.findAll();
    }

    public Optional<Task> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Task criarTarefa(Task task) {
        return repository.save(task);
    }

    public Task atualizarTarefa(Long id, Task novaTarefa) {
        return repository.findById(id)
                .map(task -> {
                    task.setTitulo(novaTarefa.getTitulo());
                    task.setDescricao(novaTarefa.getDescricao());
                    task.setConcluida(novaTarefa.isConcluida());
                    return repository.save(task);
                })
                .orElseThrow(() -> new RuntimeException("Tarefa não encontrada"));
    }

    public void deletarTarefa(Long id) {
        repository.deleteById(id);
    }

    public List<Task> buscarPorUsuario(String uid) {
    return repository.findByUid(uid);
    }

}
