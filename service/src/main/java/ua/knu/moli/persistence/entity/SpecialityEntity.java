package ua.knu.moli.persistence.entity;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "speciality")
@Data
@NoArgsConstructor
@AllArgsConstructor
//@EqualsAndHashCode(exclude = {"containers"})
//@ToString(exclude = {"containers"})
public class SpecialityEntity {
    @Id
    @NotNull
    private String shortName;
    @ManyToOne
    @JoinColumn(name="faculty_id")
    private FacultyEntity faculty;
    @NotNull
    private String fullName;
    @OneToMany(mappedBy="speciality")
    @JsonIgnore
    private Set<StudentEntity> students;
    //@OneToMany(mappedBy="speciality")
    //@JsonIgnore
    //private Set<SubjectEntity> subjects;
}
