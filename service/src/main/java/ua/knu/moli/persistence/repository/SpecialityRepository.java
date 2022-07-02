package ua.knu.moli.persistence.repository;

import ua.knu.moli.persistence.entity.FacultyEntity;
import ua.knu.moli.persistence.entity.SpecialityEntity;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SpecialityRepository extends JpaRepository<SpecialityEntity, String> {
    Optional<SpecialityEntity> findByShortName(String name);

    Optional<SpecialityEntity> deleteByShortName(String name);
}
