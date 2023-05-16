package phucdvfx12504.swp490x_backend.services;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

import org.springframework.stereotype.Service;

import phucdvfx12504.swp490x_backend.dto.UserUpdate;
import phucdvfx12504.swp490x_backend.entities.User;

@Service
public interface UserService {

    List<User> getAll();

    List<User> getFilter(String fullname, String email);

    void delete(List<String> ids);

    User update(UserUpdate userUpdate) throws IllegalArgumentException, IllegalAccessException, InvocationTargetException;

}
