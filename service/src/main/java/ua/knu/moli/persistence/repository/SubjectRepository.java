package ua.knu.moli.persistence.repository;

import ua.knu.moli.persistence.entity.SubjectEntity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SubjectRepository extends JpaRepository<SubjectEntity, String> {

}
