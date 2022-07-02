package ua.knu.moli;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;

@SpringBootApplication
@OpenAPIDefinition
public class MoliSpringBootApplication {
    public static void main(String[] args) {
        SpringApplication.run(MoliSpringBootApplication.class, args);
    }
}
