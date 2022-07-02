package ua.knu.moli.web.controller;

import ua.knu.moli.persistence.entity.StudentEntity;
import ua.knu.moli.persistence.entity.SubjectEntity;
import ua.knu.moli.persistence.repository.StudentRepository;
import ua.knu.moli.persistence.repository.SubjectRepository;

import java.util.List;
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
@RequestMapping("a/rest/student")
@RequiredArgsConstructor
public class StudentController {
    private final StudentRepository repository;
    private final SubjectRepository subjectRepository;
    private final ObjectMapper mapper = new ObjectMapper();

    @GetMapping("/{id}")
    public ResponseEntity<StudentEntity> getById(@PathVariable("id") String id) {
        return ResponseEntity.of(repository.findByMail(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<StudentEntity>> getAll() {
        return ResponseEntity.ok(repository.findAll());
    }

    @PostMapping
    public ResponseEntity<StudentEntity> save(@RequestBody @Valid StudentEntity requestDto) {
        return ResponseEntity.ok(repository.save(requestDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") String id) {
            repository.deleteByMail(id);
            return ResponseEntity.ok().build();
    }

    @GetMapping("/mail/{mail}/pass/{pass}")
    public ResponseEntity<StudentEntity> getByMailAndPass(@PathVariable("mail") String mail, @PathVariable("pass") String pass) {
        return ResponseEntity.of(repository.findByMailAndPassword(mail, pass));
    }

    @GetMapping("/mail/{mail}/subjects")
    public ResponseEntity<List<SubjectEntity>> getListOfSubjectsByStudentGroup(@PathVariable("mail") String mail) {
        StudentEntity student =  repository.findByMail(mail).orElseThrow(()-> new RuntimeException("STUDENT DOES NOT EXIST"));
        String group = student.getGroupa();

        return ResponseEntity.ok(subjectRepository.findAll().stream().filter(x -> isGroup(x, group)).collect(Collectors.toList()));
    }

    private boolean isGroup(SubjectEntity subject, String group) {
        try {
            List<String> participantJsonList = mapper.readValue(subject.getGroups(), new TypeReference<List<String>>(){});
            return participantJsonList.contains(group);
        } catch (JsonProcessingException e) {
            return false;
        }
    }



}
