package ua.knu.moli.web.controller;

import ua.knu.moli.persistence.entity.SpecialityEntity;
import ua.knu.moli.persistence.repository.SpecialityRepository;

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
@RequestMapping("a/rest/speciality")
@RequiredArgsConstructor
public class SpecialityController {
    private final SpecialityRepository repository;

    @GetMapping("/{id}")
    public ResponseEntity<SpecialityEntity> getById(@PathVariable("id") String id) {
        return ResponseEntity.of(repository.findByShortName(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<SpecialityEntity>> getAll() {
        return ResponseEntity.ok(repository.findAll());
    }

    @PostMapping
    public ResponseEntity<SpecialityEntity> save(@RequestBody @Valid SpecialityEntity requestDto) {
        return ResponseEntity.ok(repository.save(requestDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") String id) {
            repository.deleteByShortName(id);
            return ResponseEntity.ok().build();
    }
}
