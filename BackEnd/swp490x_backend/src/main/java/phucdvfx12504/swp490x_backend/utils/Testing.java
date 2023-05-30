package phucdvfx12504.swp490x_backend.utils;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.lang3.RandomStringUtils;

public class Testing {

    private static String prepairContent(String fullname, String email, String password) {
        // StringBuffer result = new StringBuffer();
        String result = "Hi, {fullname}<br />Welcome to your new account<br /><br />We inform you that you have created an account successfully<br />Here is info about your account:<br />- Username: {username}<br />- Password: {password}<br />To keep your account safe, you should change your password at the firstsign-in.<br /><br />Thank you for your using our service.<br />Best regard!";
        result = result.replace("{fullname}", fullname);
        result = result.replace("{username}", email);
        result = result.replace("{password}", password);
        return result;
    }

    public static void main(String[] args) {
        // String result = "Hi, {fullname}<br />Welcome to your new account<br /><br />We inform you that you have created an account successfully<br />Here is info about your account:<br />- Username: {username}<br />- Password: {password}<br />To keep your account safe, you should change your password at the firstsign-in.<br /><br />Thank you for your using our service.<br />Best regard!";
        // System.out.println(result.replace("{fullname}", "FULL_NAME"));
        // System.out.println(result.replace("{username}", "EMAIL"));
        // System.out.println(result.replace("{password}", "PASSWORD"));
        String abc =  prepairContent("FULLNAME","USERNAME","PASSWORD");
        System.out.println(abc);
    }
}
