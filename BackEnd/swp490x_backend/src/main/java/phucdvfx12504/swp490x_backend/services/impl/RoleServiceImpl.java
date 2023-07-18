package phucdvfx12504.swp490x_backend.services.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import phucdvfx12504.swp490x_backend.constant.ERoleName;
import phucdvfx12504.swp490x_backend.entities.Role;
import phucdvfx12504.swp490x_backend.repositories.RoleRepository;
import phucdvfx12504.swp490x_backend.services.RoleService;

@Component
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {
  private final RoleRepository roleRepository;

  @Override
  public Set<Role> getSetRoles(ERoleName[] roleNames) {
    Set<Role> roles = new HashSet<>();
    for (ERoleName roleName : roleNames) {
      roles.add(roleRepository.findByName(roleName).orElseThrow());
    }
    return roles;
  }

  @Override
  public Set<Role> getSetRoles(ERoleName roleName) {
    Set<Role> roles = new HashSet<>();
    roles.add(roleRepository.findByName(roleName).orElseThrow());
    return roles;
  }

}
