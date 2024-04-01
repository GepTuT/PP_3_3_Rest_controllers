package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;


@Controller
@RequestMapping()
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }
    @GetMapping("/user")
    public String getUser(ModelMap model, @AuthenticationPrincipal User user) {
        model.addAttribute("user", userService.getUser(user.getId()).get());
        return "userPage";
    }

    @GetMapping("/admin")
    public String getAdmin(ModelMap model, @AuthenticationPrincipal User user) {
        model.addAttribute("user", userService.getUser(user.getId()).get());
        return "admin";
    }

}
