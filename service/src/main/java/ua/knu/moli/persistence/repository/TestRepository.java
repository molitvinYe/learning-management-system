package ua.knu.moli.persistence.repository;

import ua.knu.moli.persistence.entity.TestEntity;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TestRepository extends JpaRepository<TestEntity, String> {
    List<TestEntity> findAllByTeacherMail(String mail);

    List<TestEntity> findAllBySubjectId(String mail);
}
