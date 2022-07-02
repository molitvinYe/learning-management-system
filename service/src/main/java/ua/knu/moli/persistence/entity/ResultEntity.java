package ua.knu.moli.persistence.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.GenericGenerator;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "result")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResultEntity {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "id", columnDefinition = "LONGVARBINARY")
    private String id;

    @NotNull
    private String student;

    @NotNull
    private String groupa;

    @NotNull
    private String test;

    @NotNull
    private String questions;

    @NotNull
    private String answers;

    @NotNull
    private String mark;

    @NotNull
    private String time;

    @NotNull
    private String violations;
}
