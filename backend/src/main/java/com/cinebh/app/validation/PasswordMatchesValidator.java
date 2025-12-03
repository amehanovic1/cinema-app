package com.cinebh.app.validation;

import com.cinebh.app.dto.auth.RegisterRequestDto;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordMatchesValidator implements ConstraintValidator<PasswordMatches, RegisterRequestDto> {

    @Override
    public boolean isValid(RegisterRequestDto dto, ConstraintValidatorContext context) {
        boolean valid = dto.getPassword() != null &&
                dto.getPassword().equals(dto.getConfirmPassword());

        if(!valid) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("Passwords do not match")
                    .addPropertyNode("confirmPassword")
                    .addConstraintViolation();
        }

        return valid;
    }
}
