package ua.knu.moli.persistence.repository;

import ua.knu.moli.persistence.entity.StudentEntity;
import ua.knu.moli.persistence.entity.TeacherEntity;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepository extends JpaRepository<TeacherEntity, String> {
    Optional<TeacherEntity> findByMail(String mail);
    Optional<TeacherEntity> deleteByMail(String mail);
    Optional<TeacherEntity> findByMailAndPassword(String mail, String pass);

}
