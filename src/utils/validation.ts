import { VALIDATION_RULES } from '../config/constants';

// Validation utility functions

export interface ValidationResult {
    isValid: boolean;
    errors: Record<string, string>;
}

export const validateEmail = (email: string): string | null => {
    if (!email) {
        return 'Email is required';
    }

    if (!VALIDATION_RULES.EMAIL_REGEX.test(email)) {
        return 'Please enter a valid email address';
    }

    return null;
};

export const validatePassword = (password: string): string | null => {
    if (!password) {
        return 'Password is required';
    }

    if (password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
        return `Password must be at least ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} characters`;
    }

    // Check for at least one uppercase letter
    if (!/(?=.*[A-Z])/.test(password)) {
        return 'Password must contain at least one uppercase letter';
    }

    // Check for at least one lowercase letter
    if (!/(?=.*[a-z])/.test(password)) {
        return 'Password must contain at least one lowercase letter';
    }

    // Check for at least one number
    if (!/(?=.*\d)/.test(password)) {
        return 'Password must contain at least one number';
    }

    return null;
};

export const validatePhoneNumber = (phone: string): string | null => {
    if (!phone) {
        return 'Phone number is required';
    }

    if (!VALIDATION_RULES.PHONE_REGEX.test(phone)) {
        return 'Please enter a valid phone number';
    }

    return null;
};

export const validateRequired = (value: string, fieldName: string): string | null => {
    if (!value || value.trim().length === 0) {
        return `${fieldName} is required`;
    }

    return null;
};

export const validateMinLength = (
    value: string,
    minLength: number,
    fieldName: string
): string | null => {
    if (value.length < minLength) {
        return `${fieldName} must be at least ${minLength} characters`;
    }

    return null;
};

export const validateMaxLength = (
    value: string,
    maxLength: number,
    fieldName: string
): string | null => {
    if (value.length > maxLength) {
        return `${fieldName} must be no more than ${maxLength} characters`;
    }

    return null;
};

export const validateMatch = (
    value1: string,
    value2: string,
    fieldName: string
): string | null => {
    if (value1 !== value2) {
        return `${fieldName} do not match`;
    }

    return null;
};

export const validateNumber = (value: string, fieldName: string): string | null => {
    if (!value) {
        return `${fieldName} is required`;
    }

    const num = parseFloat(value);
    if (isNaN(num)) {
        return `${fieldName} must be a valid number`;
    }

    return null;
};

export const validatePositiveNumber = (value: string, fieldName: string): string | null => {
    const numberError = validateNumber(value, fieldName);
    if (numberError) return numberError;

    const num = parseFloat(value);
    if (num <= 0) {
        return `${fieldName} must be greater than 0`;
    }

    return null;
};

export const validateForm = (
    data: Record<string, any>,
    rules: Record<string, (value: any) => string | null>
): ValidationResult => {
    const errors: Record<string, string> = {};

    for (const [field, validator] of Object.entries(rules)) {
        const error = validator(data[field]);
        if (error) {
            errors[field] = error;
        }
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

// Common validation rules
export const commonValidationRules = {
    email: validateEmail,
    password: validatePassword,
    phone: validatePhoneNumber,
    required: (fieldName: string) => (value: string) => validateRequired(value, fieldName),
    minLength: (minLength: number, fieldName: string) => (value: string) =>
        validateMinLength(value, minLength, fieldName),
    maxLength: (maxLength: number, fieldName: string) => (value: string) =>
        validateMaxLength(value, maxLength, fieldName),
    match: (fieldName: string, matchValue: string) => (value: string) =>
        validateMatch(value, matchValue, fieldName),
    number: (fieldName: string) => (value: string) => validateNumber(value, fieldName),
    positiveNumber: (fieldName: string) => (value: string) => validatePositiveNumber(value, fieldName),
};
