package ua.knu.moli.persistence.entity;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "subject")
@Data
@NoArgsConstructor
@AllArgsConstructor
//@EqualsAndHashCode(exclude = {"containers"})
//@ToString(exclude = {"containers"})
public class SubjectEntity {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "id")
    private String id;
    @NotNull
    private String name;
    @NotNull
    private String groups;
    @ManyToOne
    @JoinColumn(name = "faculty_id")
    private FacultyEntity faculty;
    //@ManyToOne
    //@JoinColumn(name = "speciality_id")
    //private SpecialityEntity speciality;
    //@OneToMany(mappedBy = "subject")
    //@JsonIgnore
    //private Set<TestEntity> tests;
}
