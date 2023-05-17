package phucdvfx12504.swp490x_backend.utils;

import phucdvfx12504.swp490x_backend.auth.AuthenticationRequest;
import phucdvfx12504.swp490x_backend.dto.UserUpdate;

public class Testing {

    public static void main(String[] args) {

        UserUpdate user = UserUpdate.builder().fullname("ten 1").email("email 1").build();
        AuthenticationRequest authenticationRequest = AuthenticationRequest.builder().email("email 2").build();
        PropertyUtils utils = new PropertyUtils();
        System.out.println(utils.copyNonNullProperties(authenticationRequest, user));
    }
}
