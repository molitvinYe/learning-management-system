package ua.knu.moli.persistence.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "student")
@Data
@NoArgsConstructor
@AllArgsConstructor
//@EqualsAndHashCode(exclude = {"containers"})
//@ToString(exclude = {"containers"})
public class StudentEntity {
    @Id
    @NotNull
    private String mail;
    @NotNull
    private String password;
    @NotNull
    private String groupa;
    @NotNull
    private String fullName;
    @ManyToOne
    @JoinColumn(name="faculty_id")
    private FacultyEntity faculty;
    @NotNull
    private Integer course;
    @ManyToOne
    @JoinColumn(name="speciality_id")
    private SpecialityEntity speciality;
}
