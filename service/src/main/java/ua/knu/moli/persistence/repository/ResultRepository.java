package ua.knu.moli.persistence.repository;

import ua.knu.moli.persistence.entity.QuestionEntity;
import ua.knu.moli.persistence.entity.ResultEntity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

public interface ResultRepository extends JpaRepository<ResultEntity, String> {
List<ResultEntity> findAllByStudent(String string);
    List<ResultEntity> findAllByGroupa(String string);

    List<ResultEntity> findAllByTest(String string);
}
