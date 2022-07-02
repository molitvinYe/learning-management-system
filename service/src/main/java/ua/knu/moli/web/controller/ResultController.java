package ua.knu.moli.web.controller;

import ua.knu.moli.persistence.entity.ResultEntity;
import ua.knu.moli.persistence.repository.ResultRepository;

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
@RequestMapping("a/rest/result")
@RequiredArgsConstructor
public class ResultController {
    private final ResultRepository repository;

    @GetMapping("/{id}")
    public ResponseEntity<ResultEntity> getById(@PathVariable("id") String id) {
        return ResponseEntity.of(repository.findById(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<ResultEntity>> getAll() {
        return ResponseEntity.ok(repository.findAll());
    }

    @PostMapping
    public ResponseEntity<ResultEntity> save(@RequestBody @Valid ResultEntity requestDto) {
        return ResponseEntity.ok(repository.save(requestDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") String id) {
        repository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/student/{id}")
    public ResponseEntity<List<ResultEntity> > GETlistoResultbystudent(@PathVariable("id") String id) {
        return ResponseEntity.ok(repository.findAllByStudent(id));
    }

    @GetMapping("/group/{id}")
    public ResponseEntity<List<ResultEntity> > GETlistoRweresultbystudent(@PathVariable("id") String id) {
        return ResponseEntity.ok(repository.findAllByGroupa(id));
    }

    @GetMapping("/test/{id}")
    public ResponseEntity<List<ResultEntity> > GETlisweretetoResultbystudent(@PathVariable("id") String id) {
        return ResponseEntity.ok(repository.findAllByTest(id));
    }
}
