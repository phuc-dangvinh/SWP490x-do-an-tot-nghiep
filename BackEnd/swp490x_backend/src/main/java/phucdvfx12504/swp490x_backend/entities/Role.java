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
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import phucdvfx12504.swp490x_backend.constant.ERoleName;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @Column(nullable = false, unique = true)
    @Enumerated(EnumType.STRING)
    private ERoleName name;
    @ManyToMany(mappedBy = "roles")
    private Set<User> users;

    public Role(ERoleName name) {
        this.name = name;
    }

}
