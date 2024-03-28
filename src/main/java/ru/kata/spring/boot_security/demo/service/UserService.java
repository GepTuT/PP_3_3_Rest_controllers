package ru.kata.spring.boot_security.demo.service;


import org.springframework.security.core.userdetails.UserDetailsService;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService extends UserDetailsService {

    public void saveUser(User user);


    public void deleteUser(Long id);

    public void changeUser(User user, Long id);

    public Optional<User> getUser(Long id);

    public List<User> getUsersList();

    User findUserByFirstName(String firstName);

    User findUserByEmail(String email);

}
