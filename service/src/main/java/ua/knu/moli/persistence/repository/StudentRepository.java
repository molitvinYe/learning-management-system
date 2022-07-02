package ua.knu.moli.persistence.repository;

import ua.knu.moli.persistence.entity.StudentEntity;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<StudentEntity, String> {
Optional<StudentEntity> findByMail(String mail);
    Optional<StudentEntity> deleteByMail(String mail);

    Optional<StudentEntity> findByMailAndPassword(String mail, String pass);
}
