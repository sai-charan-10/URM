// LoginValidation.js

const LoginValidation = (values) => {
    const errors = {};

    // Validate type field
    if (!values.type) {
        errors.type = "Login type is required";
    }

    // Validate email field
    if (!values.email.trim()) {
        errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = "Invalid email format";
    }

    // Validate password field
    if (!values.password) {
        errors.password = "Password is required";
    }

    return errors;
};

export default LoginValidation;
