package ua.knu.moli.persistence.entity;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "faculty")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FacultyEntity {
    @Id
    @NotNull
    private String shortName;

    @NotNull
    private String fullName;

    @NotNull
    private String mail;

    @JsonIgnore
    @OneToMany(mappedBy="faculty")
    private Set<SpecialityEntity> specialities;

    @JsonIgnore
    @OneToMany(mappedBy="faculty")
    private Set<StudentEntity> students;

    @JsonIgnore
    @OneToMany(mappedBy="faculty")
    private Set<TeacherEntity> teachers;

    @JsonIgnore
    @OneToMany(mappedBy="faculty")
    private Set<SubjectEntity> subjects;
}
