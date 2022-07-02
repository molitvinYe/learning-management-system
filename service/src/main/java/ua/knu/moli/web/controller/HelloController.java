package ua.knu.moli.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HelloController {
    @GetMapping("/")
    public String greeting() {
        return "redirect:swagger-ui/index.html?configUrl=/moli/v3/api-docs/swagger-config#/";
    }
}
