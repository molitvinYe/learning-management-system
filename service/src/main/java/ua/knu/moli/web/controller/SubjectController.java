package ua.knu.moli.web.controller;

import ua.knu.moli.persistence.entity.SubjectEntity;
import ua.knu.moli.persistence.repository.SubjectRepository;

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
@RequestMapping("a/rest/subject")
@RequiredArgsConstructor
public class SubjectController {
    private final SubjectRepository repository;

    @GetMapping("/{id}")
    public ResponseEntity<SubjectEntity> getById(@PathVariable("id") String id) {
        return ResponseEntity.of(repository.findById(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<SubjectEntity>> getAll() {
        return ResponseEntity.ok(repository.findAll());
    }

    @PostMapping
    public ResponseEntity<SubjectEntity> save(@RequestBody @Valid SubjectEntity requestDto) {
        return ResponseEntity.ok(repository.save(requestDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") String id) {
            repository.deleteById(id);
            return ResponseEntity.ok().build();
    }
}
