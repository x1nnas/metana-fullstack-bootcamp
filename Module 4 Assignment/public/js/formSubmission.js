class FormSubmissionHandler {
  constructor() {
    this.formData = {};

    // Define which fields we want to store
    this.fieldsToStore = [
      "username",
      "firstName",
      "lastName",
      "email",
      "newsletter",
      "termsAgreement",
    ];

    this.initializeEventListeners();
  }

  initializeEventListeners() {
    // Listen for form submission
    const form = document.getElementById("registration-form");
    if (form) {
      form.addEventListener("submit", (e) => this.handleSubmit(e));
    }

    // Listen for next button clicks to save progress
    const nextButton = document.querySelector(".next-button");
    if (nextButton) {
      nextButton.addEventListener("click", () => this.collectCurrentStepData());
    }

    // Listen for previous button clicks to save progress
    const prevButton = document.querySelector(".prev-button");
    if (prevButton) {
      prevButton.addEventListener("click", () => this.collectCurrentStepData());
    }

    // Save data when user leaves page
    window.addEventListener("beforeunload", () => this.saveFormProgress());

    // Try to load any saved data when the page loads
    this.loadSavedData();
  }

  collectCurrentStepData() {
    // Get all visible input fields in the current step
    const currentStep = document.querySelector(
      '.input-group[style*="display: block"]'
    );
    if (!currentStep) return;

    const inputs = currentStep.querySelectorAll("input");
    inputs.forEach((input) => {
      // Skip password fields for security
      if (input.type === "password") return;

      if (input.type === "checkbox") {
        this.formData[input.id] = input.checked;
      } else {
        this.formData[input.id] = input.value;
      }
    });

    // Save progress after collecting data
    this.saveFormProgress();

    // Log the current form data for debugging
    console.log("Current form data:", this.formData);
  }

  saveFormProgress() {
    try {
      // Create a copy of form data without sensitive information
      const progressData = { ...this.formData };

      // Save to localStorage
      localStorage.setItem("formProgress", JSON.stringify(progressData));
      console.log("Form progress saved:", progressData);
    } catch (error) {
      console.error("Error saving form progress:", error);
    }
  }

  loadSavedData() {
    try {
      const savedData = localStorage.getItem("formProgress");
      if (savedData) {
        this.formData = JSON.parse(savedData);
        this.populateFormFields();
        console.log("Loaded saved data:", this.formData);
      }
    } catch (error) {
      console.error("Error loading saved data:", error);
    }
  }

  populateFormFields() {
    Object.keys(this.formData).forEach((fieldId) => {
      const field = document.getElementById(fieldId);
      if (field) {
        if (field.type === "checkbox") {
          field.checked = this.formData[fieldId];
        } else {
          field.value = this.formData[fieldId];
        }
      }
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    // Collect final data before submission
    this.collectCurrentStepData();

    // Validate terms agreement
    if (!this.formData.termsAgreement) {
      alert("Please agree to the terms and conditions to continue.");
      return;
    }

    try {
      // Store user data in localStorage
      this.storeUserData();

      // Show success message and redirect
      this.showSuccessMessage();

      // Clear form progress after successful submission
      localStorage.removeItem("formProgress");

      // Redirect to movies page after successful signup
      setTimeout(() => {
        window.location.href = "movies.html";
      }, 2000);
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  }

  storeUserData() {
    // Create a user data object with selected fields
    const userData = {};
    this.fieldsToStore.forEach((field) => {
      userData[field] = this.formData[field];
    });

    // Add additional user state
    userData.isLoggedIn = true;
    userData.registrationDate = new Date().toISOString();
    userData.lastLoginDate = new Date().toISOString();

    // Store in localStorage
    localStorage.setItem("userData", JSON.stringify(userData));
    console.log("User data stored:", userData);
  }

  showSuccessMessage() {
    const container = document.querySelector(".login-container");
    const successMessage = document.createElement("div");
    successMessage.className = "submission-message";
    successMessage.innerHTML = `
        <p>Registration successful! Welcome, ${this.formData.firstName}!</p>
        <p>Redirecting to movies page...</p>
      `;

    // Hide the form
    const form = document.querySelector("form");
    if (form) {
      form.style.display = "none";
    }

    // Show success message
    container.appendChild(successMessage);
  }
}

// Export the form submission handler
export const formSubmissionHandler = new FormSubmissionHandler();
