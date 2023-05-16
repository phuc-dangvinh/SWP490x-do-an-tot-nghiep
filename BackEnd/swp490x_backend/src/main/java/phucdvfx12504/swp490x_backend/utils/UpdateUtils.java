package phucdvfx12504.swp490x_backend.utils;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class UpdateUtils {
    public Object update(Object object, Object update)
            throws IllegalArgumentException, IllegalAccessException, InvocationTargetException {
        Field[] fields = object.getClass().getDeclaredFields();
        Method[] methods = object.getClass().getMethods();
        Method get = null;
        Method set = null;
        Object newValue = null;
        for (Field field : fields) {
            for (Method method : methods) {
                if (method.getName().equalsIgnoreCase("get" + field.getName())) {
                    get = method;
                }
                if (method.getName().equalsIgnoreCase("set" + field.getName())) {
                    set = method;
                }
            }
            if (get != null) {
                newValue = get.invoke(update);
            }
            if (newValue != null) {
                set.invoke(object, newValue);
            }
        }
        return object;
    }
}
