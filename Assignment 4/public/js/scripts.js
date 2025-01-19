import { formNavigationManager } from "./formNavigation.js";
import { validationManager } from "./validation.js";

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all our input elements
  const usernameInput = document.getElementById("username");
  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const emailInput = document.getElementById("email");
  const confirmEmailInput = document.getElementById("confirmEmail");
  const form = document.getElementById("registration-form");

  // Username validation
  if (usernameInput) {
    usernameInput.addEventListener("input", function () {
      const result = validationManager.validateUsername(this.value);
      validationManager.showFieldValidation(this, result);
    });
  }

  // First name validation
  if (firstNameInput) {
    firstNameInput.addEventListener("input", function () {
      const result = validationManager.validateName(this.value, "First name");
      validationManager.showFieldValidation(this, result);
    });
  }

  // Last name validation
  if (lastNameInput) {
    lastNameInput.addEventListener("input", function () {
      const result = validationManager.validateName(this.value, "Last name");
      validationManager.showFieldValidation(this, result);
    });
  }

  // Email validation
  if (emailInput) {
    emailInput.addEventListener("input", function () {
      const previousFieldsCheck = validationManager.arePreviousFieldsFilled();
      if (!previousFieldsCheck.isValid) {
        validationManager.showFieldValidation(this, previousFieldsCheck);
        this.value = "";
        return;
      }

      const result = validationManager.validateEmail(this.value);
      validationManager.showFieldValidation(this, result);
    });
  }

  // Confirm email validation
  if (confirmEmailInput) {
    confirmEmailInput.addEventListener("input", function () {
      const previousFieldsCheck =
        validationManager.arePreviousFieldsFilled(true);
      if (!previousFieldsCheck.isValid) {
        validationManager.showFieldValidation(this, previousFieldsCheck);
        this.value = "";
        return;
      }

      const result = validationManager.validateEmailConfirmation(
        emailInput.value,
        this.value
      );
      validationManager.showFieldValidation(this, result);
    });
  }

  // Form autosave functionality
  if (form) {
    // Save form progress as user types
    form.addEventListener("input", (e) => {
      const formData = new FormData(form);
      const progressData = {};

      for (let [key, value] of formData.entries()) {
        if (!key.toLowerCase().includes("password")) {
          progressData[key] = value;
        }
      }

      try {
        localStorage.setItem("formProgress", JSON.stringify(progressData));
        console.log("Progress saved:", progressData);
      } catch (error) {
        console.error("Error saving progress:", error);
      }
    });
  }
});
