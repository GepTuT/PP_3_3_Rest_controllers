package ru.kata.spring.boot_security.demo.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleServiceImpl;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private UserServiceImpl userService;

    private RoleServiceImpl roleService;

    @Autowired
    public AdminController(UserServiceImpl userService, RoleServiceImpl roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/main")
    public String getAllUsers(ModelMap model, @AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.findUserByEmail(userDetails.getUsername());
        model.addAttribute("user", user);
        model.addAttribute("users", userService.getUsersList());
        model.addAttribute("roles", roleService.findAll());
        model.addAttribute("newUser", new User());
        return "admin";
    }


    @PostMapping("/savepost")
    public String saveUserPost(@ModelAttribute("user") User user) {
        userService.saveUser(user);
        return "redirect:/admin/main";
    }

    @DeleteMapping("/deleteuser")
    public String deleteUser(@RequestParam("id") Long id){
        userService.deleteUser(id);
        return ("redirect:/admin/main");
    }

    @PatchMapping("/edituser")
    public String changeUser(@RequestParam("id") Long id, @ModelAttribute("user") User user) {
        userService.changeUser(user, id);
        return "redirect:/admin/main";
    }


}
