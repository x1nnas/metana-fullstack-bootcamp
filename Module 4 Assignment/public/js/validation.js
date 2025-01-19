// Class to handle all validation-related functionality
class ValidationManager {
  constructor() {
    // Store validation rules and patterns as class properties
    this.validCharactersPattern = /^[a-zA-Z0-9_-]+$/;
    // Store password fields and toggle buttons as class properties
    this.passwordFields = document.querySelectorAll(".password-field");

    // Initialize the toggle functionality
    this.passwordToggle();
  }

  arePreviousFieldsFilled(isConfirmEmail = false) {
    // Get all required field values
    const username = document.getElementById("username").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;

    // Create a result object similar to our other validation methods
    let result = {
      isValid: true,
      message: "",
    };

    // Build a message about which fields are missing
    let missingFields = [];
    if (!username.trim()) missingFields.push("username");
    if (!firstName.trim()) missingFields.push("first name");
    if (!lastName.trim()) missingFields.push("last name");

    if (missingFields.length > 0) {
      result.isValid = false;
      result.message = `Please complete the following fields first: ${missingFields.join(
        ", "
      )}`;
      return result;
    }

    // For confirm email, also check the email field
    if (isConfirmEmail) {
      const email = document.getElementById("email").value;
      if (!email.trim()) {
        result.isValid = false;
        result.message = "Please enter your email address before confirming it";
        return result;
      }
    }

    return result;
  }

  validateUsername(username) {
    let result = {
      isValid: true,
      message: "",
    };

    if (!username || username.trim() === "") {
      result.isValid = false;
      result.message = "Username is required";
      return result;
    }

    if (!this.validCharactersPattern.test(username)) {
      result.isValid = false;
      result.message =
        "Username can only contain letters, numbers, underscores, or hyphens";
      return result;
    }

    return result;
  }

  validateName(name, fieldName) {
    let result = {
      isValid: true,
      message: "",
    };

    if (!name || name.trim() === "") {
      result.isValid = false;
      result.message = `${fieldName} is required`;
      return result;
    }

    if (!/^[a-zA-Z\s]+$/.test(name)) {
      result.isValid = false;
      result.message = `${fieldName} can only contain letters`;
      return result;
    }

    return result;
  }

  validateEmail(email) {
    let result = {
      isValid: true,
      message: "",
    };

    // First check: Is email provided?
    if (!email || email.trim() === "") {
      result.isValid = false;
      result.message = "Email is required";
      return result;
    }

    // Second check: Does it contain exactly one @ symbol?
    if (!email.includes("@") || email.indexOf("@") !== email.lastIndexOf("@")) {
      result.isValid = false;
      result.message = "Email must contain exactly one @ symbol";
      return result;
    }

    // Third check: Are there characters before the @?
    const [localPart, domainPart] = email.split("@");
    if (!localPart || localPart.length === 0) {
      result.isValid = false;
      result.message = "Email must have a username before the @ symbol";
      return result;
    }

    // Fourth check: Is there a valid domain after the @?
    if (!domainPart || !domainPart.includes(".") || domainPart.endsWith(".")) {
      result.isValid = false;
      result.message = "Email must have a valid domain (e.g., example.com)";
      return result;
    }

    // Final check: Full pattern validation
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      result.isValid = false;
      result.message = "Email contains invalid characters";
      return result;
    }

    return result;
  }

  validateEmailConfirmation(email, confirmEmail) {
    let result = {
      isValid: true,
      message: "",
    };

    // First check if confirmation email is provided
    if (!confirmEmail || confirmEmail.trim() === "") {
      result.isValid = false;
      result.message = "Please confirm your email address";
      return result;
    }

    // Check if emails match
    if (email !== confirmEmail) {
      result.isValid = false;
      result.message = "Email addresses do not match";
      return result;
    }

    return result;
  }

  validatePassword(password) {
    let result = {
      isValid: true,
      message: "",
    };
    // First check: Is email provided?
    if (!password || password.trim() === "") {
      result.isValid = false;
      result.message = "Password is required";
      return result;
    }
    // Second check: Is it 8 characters long?
    if (password.length < 8) {
      result.isValid = false;
      result.message = "Password must be at least 8 characters long";
      return result;
    }
    // Third check: Does it contain at least one uppercase letter?
    if (!/[A-Z]/.test(password)) {
      result.isValid = false;
      result.message = "Password must contain at least one uppercase letter";
      return result;
    }

    // Fourth check: Does it contain at least one lowercase letter?
    if (!/[a-z]/.test(password)) {
      result.isValid = false;
      result.message = "Password must contain at least one lowercase letter";
      return result;
    }

    // Fifth check: Does it contain at least one number?
    if (!/[0-9]/.test(password)) {
      result.isValid = false;
      result.message = "Password must contain at least one number";
      return result;
    }

    // Sixth check: Does it contain at least one special character?
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      result.isValid = false;
      result.message = "Password must contain at least one special character";
      return result;
    }

    return result;
  }

  validatePasswordConfirmation(password, confirmPassword) {
    let result = {
      isValid: true,
      message: "",
    };

    // First check if confirmation email is provided
    if (!confirmPassword || confirmPassword.trim() === "") {
      result.isValid = false;
      result.message = "Please confirm your password";
      return result;
    }

    // Check if emails match
    if (password !== confirmPassword) {
      result.isValid = false;
      result.message = "Password does not match";
      return result;
    }

    return result;
  }
  validateCurrentStep(currentStep) {
    switch (currentStep) {
      case 0:
        return this.validateNameStep();
      case 1:
        return this.validateEmailStep();
      case 2:
        return this.validatePasswordStep();
      case 3:
        return this.validateSubmitStep();
      default:
        return { isValid: true, message: "" };
    }
  }

  showFieldValidation(inputElement, validationResult) {
    // Remove any existing validation message
    const existingMessage = inputElement.parentElement.querySelector(
      ".validation-message"
    );
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create and show validation message if validation failed
    if (!validationResult.isValid) {
      const messageElement = document.createElement("div");
      messageElement.className = "validation-message";
      messageElement.style.color = "red";
      messageElement.style.fontSize = "0.8rem";
      messageElement.textContent = validationResult.message;
      inputElement.parentElement.appendChild(messageElement);
    }

    // Add visual feedback on the input field
    inputElement.style.borderColor = validationResult.isValid ? "#ccc" : "red";
  }

  validateNameStep() {
    const username = document.getElementById("username").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;

    const validations = [
      { field: "username", result: this.validateUsername(username) },
      {
        field: "firstName",
        result: this.validateName(firstName, "First name"),
      },
      { field: "lastName", result: this.validateName(lastName, "Last name") },
    ];

    let hasErrors = false;
    validations.forEach(({ field, result }) => {
      const inputElement = document.getElementById(field);
      this.showFieldValidation(inputElement, result);
      if (!result.isValid) {
        hasErrors = true;
      }
    });

    return {
      isValid: !hasErrors,
      message: hasErrors ? "Please complete all required fields" : "",
    };
  }

  validateEmailStep() {
    const email = document.getElementById("email").value;
    const confirmEmail = document.getElementById("confirmEmail").value;

    const emailValidation = this.validateEmail(email);
    this.showFieldValidation(document.getElementById("email"), emailValidation);

    if (!emailValidation.isValid) {
      return emailValidation;
    }

    const confirmValidation = this.validateEmailConfirmation(
      email,
      confirmEmail
    );
    this.showFieldValidation(
      document.getElementById("confirmEmail"),
      confirmValidation
    );

    return confirmValidation;
  }

  validatePasswordStep() {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const passwordValidation = this.validatePassword(password);
    this.showFieldValidation(
      document.getElementById("password"),
      passwordValidation
    );

    if (!passwordValidation.isValid) {
      return passwordValidation;
    }
    const confirmValidation = this.validatePasswordConfirmation(
      password,
      confirmPassword
    );
    this.showFieldValidation(
      document.getElementById("confirmPassword"),
      confirmValidation
    );

    return confirmValidation;
  }
  passwordToggle() {
    this.passwordFields.forEach((field) => {
      const passwordInput = field.querySelector('input[type="password"]');
      const toggleButton = field.querySelector(".toggle-password");
      const toggleIcon = toggleButton.querySelector("i");

      // Set initial state
      toggleIcon.classList.remove("fa-eye-slash");
      toggleIcon.classList.add("fa-eye");

      toggleButton.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent any form submission

        // Get all password inputs and their associated icons
        const allPasswordInputs = document.querySelectorAll(
          ".password-field input"
        );
        const allToggleIcons = document.querySelectorAll(".toggle-password i");

        // Get the new type based on the current input
        const type =
          passwordInput.getAttribute("type") === "password"
            ? "text"
            : "password";

        // Update all password inputs and icons
        allPasswordInputs.forEach((input) => input.setAttribute("type", type));
        allToggleIcons.forEach((icon) => {
          icon.classList.toggle("fa-eye");
          icon.classList.toggle("fa-eye-slash");
        });
      });
    });
  }

  clearTermsError(checkboxField) {
    const existingMessage = checkboxField.querySelector(".validation-message");
    if (existingMessage) {
      existingMessage.remove();
    }
  }

  showTermsError(checkboxField, message) {
    // Remove any existing error message first
    const existingMessage = checkboxField.querySelector(".validation-message");
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create and show new validation message
    const messageElement = document.createElement("div");
    messageElement.className = "validation-message";
    messageElement.textContent = message;
    checkboxField.appendChild(messageElement);
  }

  validateSubmitStep() {
    const termsCheckbox = document.getElementById("termsAgreement");
    const checkboxField = termsCheckbox.closest(".checkbox-field");

    // Add event listener to clear error when checkbox is checked
    termsCheckbox.addEventListener("change", (e) => {
      if (e.target.checked) {
        const existingMessage = checkboxField.querySelector(
          ".validation-message"
        );
        if (existingMessage) {
          existingMessage.remove();
        }
      }
    });

    let result = {
      isValid: true,
      message: "",
    };

    // Show error if checkbox is not checked
    if (!termsCheckbox.checked) {
      result.isValid = false;
      result.message =
        "You must agree to the Terms of Service and Privacy Policy";
      this.showTermsError(checkboxField, result.message);
    }

    return result;
  }
}
// Export for use in other files
export const validationManager = new ValidationManager();
