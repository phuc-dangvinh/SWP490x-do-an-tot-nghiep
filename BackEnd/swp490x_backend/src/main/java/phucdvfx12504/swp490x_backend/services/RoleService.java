package phucdvfx12504.swp490x_backend.services;

import java.util.Set;

import org.springframework.stereotype.Service;

import phucdvfx12504.swp490x_backend.constant.ERoleName;
import phucdvfx12504.swp490x_backend.entities.Role;

@Service
public interface RoleService {
  Set<Role> getSetRoles(ERoleName[] roleNames);

  Set<Role> getSetRoles(ERoleName roleName);
}
