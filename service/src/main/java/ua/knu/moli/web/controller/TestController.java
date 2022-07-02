package ua.knu.moli.web.controller;

import ua.knu.moli.persistence.entity.SubjectEntity;
import ua.knu.moli.persistence.entity.TeacherEntity;
import ua.knu.moli.persistence.entity.TestEntity;
import ua.knu.moli.persistence.repository.TeacherRepository;
import ua.knu.moli.persistence.repository.TestRepository;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("a/rest/test")
@RequiredArgsConstructor
public class TestController {
    private final ObjectMapper mapper = new ObjectMapper();
    private final TestRepository repository;
    private final TeacherRepository teacherRepository;

    @GetMapping("/{id}")
    public ResponseEntity<TestEntity> getById(@PathVariable("id") String id) {
        return ResponseEntity.of(repository.findById(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<TestEntity>> getAll() {
        return ResponseEntity.ok(repository.findAll());
    }

    @PostMapping
    public ResponseEntity<TestEntity> save(@RequestBody @Valid TestEntity requestDto) {
        return ResponseEntity.ok(repository.save(requestDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") String id) {
        repository.deleteById(id);
        return ResponseEntity.ok().build();

    }

    @GetMapping("/student/{group}")
    public ResponseEntity<Set<TestEntity>> getListOfTestsByStudentGroup(@PathVariable("group") String group) {
        return ResponseEntity.ok(repository.findAll().stream().filter(x -> isGroup(x, group)).collect(Collectors.toSet()));
    }


    @GetMapping("/teacher/{mail}")
    public ResponseEntity<List<TestEntity>> GETlistofTestsbyteacherEmail(@PathVariable("mail") String email) {
        return ResponseEntity.ok(repository.findAllByTeacherMail(email));
    }

    @GetMapping("/subject/{subject}")
    public ResponseEntity<List<TestEntity>> GETlistofTestsbySubjectId(@PathVariable("subject") String subject) {
        return ResponseEntity.ok(repository.findAllBySubjectId(subject));
    }


    private boolean isGroup(TestEntity testEntity, String group) {
        try {
            List<String> participantJsonList = mapper.readValue(testEntity.getGroups(), new TypeReference<List<String>>(){});
            return participantJsonList.contains(group);
        } catch (JsonProcessingException e) {
            return false;
        }
    }



}
