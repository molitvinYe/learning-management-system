package ua.knu.moli.persistence.repository;

import ua.knu.moli.persistence.entity.QuestionEntity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<QuestionEntity, String> {
    List<QuestionEntity> findAllByTestId(String id);
}
