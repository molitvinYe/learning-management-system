package ua.knu.moli.web.controller;

import ua.knu.moli.persistence.entity.QuestionEntity;
import ua.knu.moli.persistence.entity.StudentEntity;
import ua.knu.moli.persistence.repository.QuestionRepository;
import ua.knu.moli.persistence.repository.StudentRepository;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("a/rest/question")
@RequiredArgsConstructor
public class QuestionController {
    private final QuestionRepository repository;

    @GetMapping("/{id}")
    public ResponseEntity<QuestionEntity> getById(@PathVariable("id") String id) {
        return ResponseEntity.of(repository.findById(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<QuestionEntity>> getAll() {
        return ResponseEntity.ok(repository.findAll());
    }

    @PostMapping
    public ResponseEntity<QuestionEntity> save(@RequestBody @Valid QuestionEntity requestDto) {
        return ResponseEntity.ok(repository.save(requestDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") String id) {
            repository.deleteById(id);
            return ResponseEntity.ok().build();
    }

    @GetMapping("test/{id}")
    public ResponseEntity<List<QuestionEntity>> GetlistofQuestionsbytestid(@PathVariable("id") String id) {
        return ResponseEntity.ok(repository.findAllByTestId(id));
    }

}
