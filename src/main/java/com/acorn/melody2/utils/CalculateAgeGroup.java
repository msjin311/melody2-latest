package com.acorn.melody2.utils;

import java.util.Calendar;
import java.util.Date;

public class CalculateAgeGroup {

    public static String calculateAgeGroup(Date birthDate){
        int age = calculateAge(birthDate);
        int ageGroup = age/10;

        return String.valueOf(ageGroup);
    }

    public static int calculateAge(Date birthDate){
        Calendar birthCalendar = Calendar.getInstance();
        birthCalendar.setTime(birthDate);

        Calendar currentCalendar = Calendar.getInstance();

        int age = currentCalendar.get(Calendar.YEAR) - birthCalendar.get(Calendar.YEAR);
        if (currentCalendar.get(Calendar.MONTH) < birthCalendar.get(Calendar.MONTH) ||
                (currentCalendar.get(Calendar.MONTH) == birthCalendar.get(Calendar.MONTH) &&
                        currentCalendar.get(Calendar.DAY_OF_MONTH) < birthCalendar.get(Calendar.DAY_OF_MONTH))) {
            age--;
        }
        return age;

    }
}
