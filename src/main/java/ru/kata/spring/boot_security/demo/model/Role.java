package ru.kata.spring.boot_security.demo.model;

import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;

@Entity
@Table(name = "roles")
public class Role implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private Long role_id;

    @Column
    private String roleName;

    public Role() {
    }

    public Role(Long id) {
        this.role_id = id;
    }

    public Role(Long id, String roleName) {
        this.role_id = id;
        this.roleName = roleName;
    }


    public long getId() {
        return role_id;
    }

    public void setId(Long id) {
        this.role_id = id;
    }

    public String getRole() {
        return this.roleName;
    }

    public void setRole(String role) {
        this.roleName = role;
    }

    @Override
    public String toString() {
        return roleName;
    }

    @Override
    public String getAuthority() {
        return roleName;
    }
}
