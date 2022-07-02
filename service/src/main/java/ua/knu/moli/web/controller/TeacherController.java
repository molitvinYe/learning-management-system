package ua.knu.moli.web.controller;

import ua.knu.moli.persistence.entity.StudentEntity;
import ua.knu.moli.persistence.entity.SubjectEntity;
import ua.knu.moli.persistence.entity.TeacherEntity;
import ua.knu.moli.persistence.repository.SubjectRepository;
import ua.knu.moli.persistence.repository.TeacherRepository;

import java.util.HashSet;
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
@RequestMapping("a/rest/teacher")
@RequiredArgsConstructor
public class TeacherController {
    private final TeacherRepository repository;
    private final ObjectMapper mapper = new ObjectMapper();
    private final SubjectRepository subjectRepository;

    @GetMapping("/{id}")
    public ResponseEntity<TeacherEntity> getById(@PathVariable("id") String id) {
        return ResponseEntity.of(repository.findByMail(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<TeacherEntity>> getAll() {
        return ResponseEntity.ok(repository.findAll());
    }

    @PostMapping
    public ResponseEntity<TeacherEntity> save(@RequestBody @Valid TeacherEntity requestDto) {
        return ResponseEntity.ok(repository.save(requestDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") String id) {
        repository.deleteByMail(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/mail/{mail}/pass/{pass}")
    public ResponseEntity<TeacherEntity> getByMailAndPass(@PathVariable("mail") String mail, @PathVariable("pass") String pass) {
        return ResponseEntity.of(repository.findByMailAndPassword(mail, pass));
    }

   @GetMapping("/mail/{mail}/subjects")
    public ResponseEntity<String> getListOSubjectsByTeacherEmail(@PathVariable("mail") String mail) {
        TeacherEntity teacher =  repository.findByMail(mail).orElseThrow(()-> new RuntimeException("Teacher DOES NOT EXIST"));

        return ResponseEntity.ok(teacher.getSubjects());
    }

    @GetMapping("/mail/{mail}/name")
    public ResponseEntity<String> getTeacherFullNameByTeacherEmail(@PathVariable("mail") String mail) {
        return ResponseEntity.of(repository.findByMail(mail).map(TeacherEntity::getFullName));
    }



}
