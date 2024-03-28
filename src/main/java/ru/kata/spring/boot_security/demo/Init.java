package ru.kata.spring.boot_security.demo;

import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.annotation.PostConstruct;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class Init {
    private final UserService userService;

    public Init(UserService userService) {
        this.userService = userService;
    }

    @PostConstruct
    public void init() {
        User admin = new User("Maksim","Bahir","admin@mail.ru", "admin");
        Role userRole = new Role(1L,"ROLE_USER");
        Role adminRole = new Role(2L,"ROLE_ADMIN");

        Set<Role> adminRoles = new HashSet<>();
        adminRoles.add(userRole);
        adminRoles.add(adminRole);
        admin.setRoles(adminRoles);
        User user = new User("user","u","user@mail.ru", "1");
        Role userRole1 = new Role(1L,"ROLE_USER");

        adminRoles.add(userRole);

        user.setRoles(adminRoles.stream().limit(1).collect(Collectors.toSet()));

        userService.saveUser(admin);
        userService.saveUser(user);
    }
}
