package ua.knu.moli.persistence.entity;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
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
@Table(name = "test")
@Data
@NoArgsConstructor
@AllArgsConstructor
//@EqualsAndHashCode(exclude = {"containers"})
//@ToString(exclude = {"containers"})
public class TestEntity {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "id")
    private String id;
    @NotNull
    private String name;
    @NotNull
    private String groups;
    @NotNull
    private Boolean isAvailable;
    @NotNull
    private String teacherMail;
    //@ManyToOne
    //@JoinColumn(name="subject_id")
    private String subjectId ;
    private String date;
    private String startTime;
    private String endTime;
    private String duration;
}
