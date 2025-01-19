import { validationManager } from "./validation.js";

class FormNavigationManager {
  constructor() {
    // Initialize all elements so they're available when we attach listeners
    this.currentStep = 0;
    this.initializeElements();

    // Attach listeners and update initial UI state
    this.setupEventListeners();
    this.updateRulesVisibility();
    this.updateProgressBar();
  }

  initializeElements() {
    // Form sections
    this.steps = document.querySelectorAll(".input-group");
    this.nextButton = document.querySelector(".next-button");
    this.prevButton = document.querySelector(".prev-button");
    this.submitButton = document.querySelector(".submit-button");
    this.form = document.getElementById("registration-form");

    // Progress elements
    this.progressSteps = document.querySelectorAll(".progress-bar .step");
    this.bullets = document.querySelectorAll(".bullet");
    this.progressTexts = document.querySelectorAll(".step p");
    this.progressChecks = document.querySelectorAll(".check");

    // Rules sections
    this.usernameRules = document.querySelector(".username-rules");
    this.emailRules = document.querySelector(".email-rules");
    this.passwordRules = document.querySelector(".password-rules");
  }

  setupEventListeners() {
    // Add navigation button listeners
    if (this.nextButton) {
      this.nextButton.addEventListener("click", (e) => {
        e.preventDefault();
        this.nextStep();
      });
    }

    if (this.prevButton) {
      this.prevButton.addEventListener("click", (e) => {
        e.preventDefault();
        this.previousStep();
      });
    }

    // Add submit button listener
    if (this.submitButton) {
      this.submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        this.handleSubmit();
      });
    }

    // Add form submit listener
    if (this.form) {
      this.form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (this.currentStep === this.steps.length - 1) {
          this.handleSubmit();
        }
      });
    }

    // Add back button listener if it exists
    const backButton = document.querySelector(".back-button");
    if (backButton) {
      backButton.addEventListener("click", () => {
        window.location.href = "index.html";
      });
    }
  }

  updateRulesVisibility() {
    // Hide all rules first
    if (this.usernameRules) this.usernameRules.style.display = "none";
    if (this.emailRules) this.emailRules.style.display = "none";
    if (this.passwordRules) this.passwordRules.style.display = "none";

    // Show appropriate rules based on current step
    switch (this.currentStep) {
      case 0: // Name step
        if (this.usernameRules) this.usernameRules.style.display = "block";
        break;
      case 1: // Email step
        if (this.emailRules) this.emailRules.style.display = "block";
        break;
      case 2: // Password step
        if (this.passwordRules) this.passwordRules.style.display = "block";
        break;
    }
  }

  nextStep() {
    const validationResult = validationManager.validateCurrentStep(
      this.currentStep
    );

    if (!validationResult.isValid) {
      return;
    }

    if (this.currentStep < this.steps.length - 1) {
      this.steps[this.currentStep].style.display = "none";
      this.currentStep++;
      this.steps[this.currentStep].style.display = "block";
      this.prevButton.style.display = "block";

      if (this.currentStep === this.steps.length - 1) {
        this.nextButton.style.display = "none";
        this.submitButton.style.display = "block";
      }

      this.updateRulesVisibility();
      this.updateProgressBar();
    }
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.steps[this.currentStep].style.display = "none";
      this.currentStep--;
      this.steps[this.currentStep].style.display = "block";

      if (this.currentStep === this.steps.length - 2) {
        this.submitButton.style.display = "none";
        this.nextButton.style.display = "block";
      }

      if (this.currentStep === 0) {
        this.prevButton.style.display = "none";
      }

      this.updateRulesVisibility();
      this.updateProgressBar();
    }
  }

  handleSubmit() {
    // Validate the final step
    const validationResult = validationManager.validateCurrentStep(
      this.currentStep
    );
    if (!validationResult.isValid) {
      return;
    }

    // Collect form data
    const userData = {
      username: document.getElementById("username").value,
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      newsletter: document.getElementById("newsletter").checked,
      termsAgreement: document.getElementById("termsAgreement").checked,
      isLoggedIn: true,
      registrationDate: new Date().toISOString(),
      lastLoginDate: new Date().toISOString(),
    };

    try {
      // Store in localStorage
      localStorage.setItem("userData", JSON.stringify(userData));
      console.log("User data stored successfully:", userData);

      // Show success message
      this.showSuccessMessage(userData.firstName);

      // Redirect after delay
      setTimeout(() => {
        window.location.href = "movies.html";
      }, 2000);
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  }

  updateProgressBar() {
    this.progressSteps.forEach((step, index) => {
      if (index <= this.currentStep) {
        step.classList.add("active");
      } else {
        step.classList.remove("active");
      }
    });
  }

  showSuccessMessage(firstName) {
    const container = document.querySelector(".login-container");
    const successMessage = document.createElement("div");
    successMessage.className = "submission-message";
    successMessage.innerHTML = `
      <p>Registration successful! Welcome, ${firstName}!</p>
      <p>Redirecting to movies page...</p>
    `;

    // Hide the form
    if (this.form) {
      this.form.style.display = "none";
    }

    // Show success message
    container.appendChild(successMessage);
  }
}

export const formNavigationManager = new FormNavigationManager();
