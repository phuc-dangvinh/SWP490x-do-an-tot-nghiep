package phucdvfx12504.swp490x_backend.entities;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import phucdvfx12504.swp490x_backend.constant.ERole;

@Entity
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ERole role;
    @ManyToMany(mappedBy = "roles")
    private Set<User> users;
}
