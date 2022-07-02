package ua.knu.moli.persistence.repository;

import ua.knu.moli.persistence.entity.FacultyEntity;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FacultyRepository extends JpaRepository<FacultyEntity, String> {
    Optional<FacultyEntity> findByShortName(String name);


    Optional<FacultyEntity> deleteByShortName(String name);
}
